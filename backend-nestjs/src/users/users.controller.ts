/* eslint-disable prettier/prettier */
import { Param, Query } from '@nestjs/common';
import { GetAllUsersDto, GetOneUserDto } from './dto';
import { UsersService } from './users.service';
import { ApiController, GetAllMethod, GetOneMethod, ID } from 'common/decorator';

@ApiController("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @GetAllMethod()
    async findAll(@Query() getAllUsersDto: GetAllUsersDto) {
        return this.usersService.findAll(getAllUsersDto);
    }

    @GetOneMethod(":id")
    async findOne(@Param() getOneUserDto: GetOneUserDto, @ID() id: number) {
        return this.usersService.findOne(id);
    }
}
