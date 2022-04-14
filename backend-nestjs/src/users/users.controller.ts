/* eslint-disable prettier/prettier */
import { Param, Query, ValidationPipe } from '@nestjs/common';
import {
  ApiController,
  GetAllMethod,
  GetOneMethod,
  ID,
} from 'src/common/decorator';
import { ListUsersParams, GetOneUserDto } from './dto';
import { UsersService } from './users.service';

@ApiController('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @GetAllMethod()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    listUsersParams: ListUsersParams,
  ) {
    return this.usersService.findAll(listUsersParams);
  }

  @GetOneMethod(':id')
  async findOne(@Param() getOneUserDto: GetOneUserDto, @ID() id: number) {
    return this.usersService.findOne(id);
  }
}
