/* eslint-disable prettier/prettier */
import { Body, Param, Query, HttpCode, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import {
  CreateRoleDto,
  ListRolesParams,
  UpdateRoleDto,
  GetOneRoleDto,
  AddUsersDto,
} from './dto';
import {
  ApiController,
  GetAllMethod,
  GetOneMethod,
  PostMethod,
  PutMethod,
  DeleteMethod,
  ID,
} from 'src/common/decorator';

@ApiController('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @HttpCode(201)
  @PostMethod()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @GetOneMethod(':id')
  findOne(@Param() getOneRoleDto: GetOneRoleDto, @ID() id: number) {
    return this.rolesService.findOne(id);
  }

  @GetAllMethod()
  findAll(
    @Query(new ValidationPipe({ transform: true }))
    listRolesParams: ListRolesParams,
  ) {
    return this.rolesService.findAll(listRolesParams);
  }

  @PutMethod(':id')
  update(@ID() id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @DeleteMethod(':id')
  remove(@Param() getOneRoleDto: GetOneRoleDto, @ID() id: number) {
    return this.rolesService.remove(id);
  }

  @PutMethod(':id/addUsers')
  addUsers(
    @Param() getOneRoleDto: GetOneRoleDto,
    @ID() id: number,
    @Body() addUsersDto: AddUsersDto,
  ) {
    return this.rolesService.addUsers(id, addUsersDto);
  }
}
