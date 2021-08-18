/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto, GetAllRolesDto, AddUsersDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role, Permission } from 'database/database.entities';
import { CreateResponse, DestroyResponse, FindAllResponse, FindOneResponse, PaginateResponse, UpdateResponse } from 'common/httpResponse';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) public roleRepository: typeof Role
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleRepository.create(createRoleDto);
      if (createRoleDto.permissions)
        role.$set('permissions', createRoleDto.permissions.map(id => +id));
      return new CreateResponse(role);
    } catch (error) {
      throw new InternalServerErrorException()
    }

  }

  async findAll(getAllRolesDto: GetAllRolesDto) {
    const { offset, size, paginate, ...otherOptions } = getAllRolesDto;
    const paginateOptions = { offset, limit: size };
    const options = { where: {} }
    for (const key in otherOptions)
      if (otherOptions[key])
        options.where = { ...options.where, [key]: otherOptions[key] }

    if (paginate) {
      const result = await this.roleRepository.findAndCountAll({ ...paginateOptions, ...options })
      return new PaginateResponse(result.rows, result.count);
    }

    const result = await this.roleRepository.findAll(options)
    return new FindAllResponse(result);
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findByPk(id, {
        include: [{
          model: Permission, attributes: ["id", 'title'], through: { attributes: [] }
        }]
      })
      if (!role)
        throw new NotFoundException();
      return new FindOneResponse(role);
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.roleRepository.findByPk(id);
      await this.roleRepository.update(updateRoleDto, { where: { id } })
      if (updateRoleDto.permissions)
        role.$set('permissions', updateRoleDto.permissions)
      return new UpdateResponse();
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: number) {
    try {
      const role = await this.roleRepository.findByPk(id)
      if (!role) throw new NotFoundException()
      await role.destroy();
      return new DestroyResponse();
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async addUsers(id: number, addUsersDto: AddUsersDto) {
    const role = await this.roleRepository.findByPk(id)
    role.$add("users", addUsersDto.userId)
    return new UpdateResponse("با موفقیت اضافه شد")
  }
}
