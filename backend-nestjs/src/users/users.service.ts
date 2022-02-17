/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ListUsersParams, UpdateUserDto } from './dto';
import { Op } from 'sequelize';
import {
  PaginateResponse,
  FindAllResponse,
  FindOneResponse,
} from 'common/httpResponse';
import { Role } from 'roles/entities';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async findAll(listUsersParams: ListUsersParams) {
    const { offset, size, paginate, ...whereOptions } = listUsersParams;
    const paginationOptions = { offset, limit: size };
    const options = { where: {} };

    if (whereOptions.email)
      options.where = { ...options.where, email: whereOptions.email };

    for (const field of ['firstName', 'lastName'])
      if (whereOptions[field])
        options.where = {
          ...options.where,
          [field]: { [Op.like]: `%${whereOptions[field]}%` },
        };

    for (const field of ['isEmailVerified', 'isPhoneNumberVerified'])
      if (whereOptions[field])
        options.where = {
          ...options.where,
          [field]: whereOptions[field] === 'true',
        };

    if (paginate) {
      const result = await this.userRepository.findAndCountAll({
        ...paginationOptions,
        ...options,
        attributes: { exclude: ['avatarId', 'password'] },
        include: ['avatar'],
      });
      return new PaginateResponse(result.rows, result.count);
    }

    const result = await this.userRepository.findAll(options);
    return new FindAllResponse(result);
  }

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.userRepository.findOne<User>({
      where: { email },
      attributes: {
        exclude: ['avatarId'],
      },
      include: 'avatar',
    });
    if (!result) throw new NotFoundException();
    return result.get();
  }

  async findOne(id: number) {
    const result = await this.userRepository.findByPk(id, {
      attributes: { exclude: ['avatarId', 'password', 'roleId'] },
      include: [
        {
          model: Role,
          attributes: ['id', 'title', 'label', 'allowAny'],
          include: ['permissions'],
        },
        'avatar',
      ],
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(updateUserDto, {
      where: { id: user.id },
    });
  }
}
