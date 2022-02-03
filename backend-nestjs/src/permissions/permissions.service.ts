/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateResponse,
  DestroyResponse,
  FindAllResponse,
  FindOneResponse,
  PaginateResponse,
  UpdateResponse,
} from 'common/httpResponse';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  ListPermissoinsParams,
} from './dto';
import { Permission } from './entities';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission) private permissionRepository: typeof Permission,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const result = await this.permissionRepository.create(
        createPermissionDto,
      );
      return new CreateResponse(result);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(listPermissoinsParams: ListPermissoinsParams) {
    try {
      const { paginate, offset, size, ...otherOptions } = listPermissoinsParams;
      const paginateOptions = { offset, limit: size };
      const options = { where: {} };
      for (const key in otherOptions)
        options.where = { ...options.where, [key]: otherOptions[key] };
      if (paginate) {
        const result = await this.permissionRepository.findAndCountAll({
          ...paginateOptions,
          ...options,
          attributes: ['id', 'title'],
        });
        return new PaginateResponse(result.rows, result.count);
      }
      const result = await this.permissionRepository.findAll({
        ...options,
        attributes: ['id', 'title'],
      });
      return new FindAllResponse(result);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findByPk(id);
    if (!permission) throw new NotFoundException();
    return new FindOneResponse(permission);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      await this.permissionRepository.update(updatePermissionDto, {
        where: { id },
      });
      return new UpdateResponse();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    const permission = await this.permissionRepository.findByPk(id);
    if (!permission) throw new NotFoundException();
    await permission.destroy();
    return new DestroyResponse();
  }
}
