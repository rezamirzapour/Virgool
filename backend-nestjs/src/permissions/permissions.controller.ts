/* eslint-disable prettier/prettier */
import { Body, Param, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, UpdatePermissionDto, GetAllPermissionDto, GetOnePermissionParams } from './dto';
import { ApiController, GetAllMethod, GetOneMethod, PostMethod, PutMethod, DeleteMethod, ID } from 'common/decorator';

@ApiController('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @PostMethod()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @GetAllMethod()
  findAll(@Query() getAllPermissionDto: GetAllPermissionDto) {
    return this.permissionsService.findAll(getAllPermissionDto);
  }

  @GetOneMethod(':id')
  findOne(@Param() params: GetOnePermissionParams, @ID() id: number) {
    return this.permissionsService.findOne(id);
  }

  @PutMethod(':id')
  update(@Param() params: GetOnePermissionParams, id: number, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @DeleteMethod(':id')
  remove(@ID() id: number) {
    return this.permissionsService.remove(id);
  }
}
