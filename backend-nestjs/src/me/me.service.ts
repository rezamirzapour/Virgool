/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMeDto } from './dto/create-me.dto';
import { UpdateMeDto } from './dto/update-me.dto';
import { UsersService } from 'users/users.service';
import { UpdateUserDto } from 'users/dto';
import { UpdateResponse } from 'common/httpResponse';

@Injectable()
export class MeService {
  constructor(private usersService: UsersService) { }
  async updateProfile(user, updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(user, updateUserDto)
      return new UpdateResponse();
    } catch (error) {
      throw new InternalServerErrorException()
    }

  }
  create(createMeDto: CreateMeDto) {
    return 'This action adds a new me';
  }

  findAll() {
    return `This action returns all me`;
  }

  findOne(id: number) {
    return `This action returns a #${id} me`;
  }

  update(id: number, updateMeDto: UpdateMeDto) {
    return `This action updates a #${id} me`;
  }

  remove(id: number) {
    return `This action removes a #${id} me`;
  }
}
