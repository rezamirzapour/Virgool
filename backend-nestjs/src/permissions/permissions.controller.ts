/* eslint-disable prettier/prettier */
import { Body, Param, Query, HttpCode, ValidationPipe } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, UpdatePermissionDto, ListPermissoinsParams, GetOnePermissionParams } from './dto';
import { ApiController, GetAllMethod, GetOneMethod, PostMethod, PutMethod, DeleteMethod, ID } from 'common/decorator';

@ApiController('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @HttpCode(201)
  @PostMethod()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @GetAllMethod()
  findAll(@Query(new ValidationPipe({ transform: true })) listPermissoinsParams: ListPermissoinsParams) {
    return this.permissionsService.findAll(listPermissoinsParams);
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
