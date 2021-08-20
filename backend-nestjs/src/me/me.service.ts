/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsersService } from 'users/users.service';
import { UpdateUserDto } from 'users/dto';
import { PaginateResponse, UpdateResponse } from 'common/httpResponse';
import { User, Following, Notification } from 'database/database.entities'
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FindAllResponse } from 'common/httpResponse';
import { GetFollowingsQuery } from './dto';
import { UserFollowedEvent } from './events';

@Injectable()
export class MeService {
  constructor(
    private usersService: UsersService,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Notification) private notificationRepository: typeof Notification,
    @InjectModel(Following) private followingRepository: typeof Following,
    private eventEmitter: EventEmitter2
  ) { }
  async updateProfile(user: User, updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(user, updateUserDto)
      return new UpdateResponse();
    } catch (error) {
      throw new InternalServerErrorException()
    }

  }

  async getMyFollowers(currentUser: User, params: GetFollowingsQuery) {
    const { paginate, offset, size: limit } = params
    if (paginate) {
      const users = await this.followingRepository.findAndCountAll({ where: { followingId: currentUser.id }, limit, offset, attributes: ['followerId'] })
      const result = await this.userRepository.findAndCountAll({ where: { id: { [Op.in]: users.rows.map(u => u.followerId) } } })
      return new PaginateResponse(result.rows, result.count)
    }
    const users = await this.followingRepository.findAll({ where: { followerId: currentUser.id }, attributes: ['followerId'] })
    const result = await this.userRepository.findAll({ where: { id: { [Op.in]: users.map(u => u.followerId) } } })
    return new FindAllResponse(result)
  }

  async getMyFollowings(currentUser: User, params: GetFollowingsQuery) {
    const { paginate, offset, size: limit } = params
    if (paginate) {
      const users = await this.followingRepository.findAndCountAll({ where: { followerId: currentUser.id }, limit, offset, attributes: ['followingId'] })
      const result = await this.userRepository.findAndCountAll({ where: { id: { [Op.in]: users.rows.map(u => u.followingId) } } })
      return new PaginateResponse(result.rows, result.count)
    }
    const users = await this.followingRepository.findAll({ where: { followerId: currentUser.id }, attributes: ['followingId'] })
    const result = await this.userRepository.findAll({ where: { id: { [Op.in]: users.map(u => u.followingId) } } })
    return new FindAllResponse(result)
  }

  async follow(currentUser: User, userId: number) {
    if (currentUser.id === userId)
      throw new BadRequestException()
    const following = await this.userRepository.findByPk(currentUser.id)
    await following.$add('followings', userId)
    const follower = await this.userRepository.findByPk(userId)
    this.eventEmitter.emit(
      'user.followed',
      new UserFollowedEvent(following, follower),
    );
    return true;
  }

  async unfollow(currentUser: User, userId: number) {
    if (currentUser.id === userId)
      throw new BadRequestException()
    const user = await this.userRepository.findByPk(currentUser.id)
    user.$remove('followings', userId)
    return true;
  }

  async createNotification(userId: number, message: string) {
    await this.notificationRepository.create({ userId, message })
    return true;
  }
}
