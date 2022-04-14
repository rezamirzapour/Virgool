/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAllResponse, PaginateResponse } from 'src/common/httpResponse';
import { Photo } from 'src/database/database.entities';
import { ListAllArticlesParams } from './dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photo) private readonly photoRepository: typeof Photo,
  ) {}

  public async findAll(listAllArticlesParams: ListAllArticlesParams) {
    const { size, offset, paginate, ...otherOptions } = listAllArticlesParams;
    const paginateOptions = { offset, limit: size };
    const options = { where: {} };

    if (paginate) {
      const result = await this.photoRepository.findAndCountAll({
        ...paginateOptions,
        ...options,
      });
      return new PaginateResponse(result.rows, result.count);
    }

    const result = await this.photoRepository.findAll(options);
    return new FindAllResponse(result);
  }

  public create(data: any) {
    return this.photoRepository.create(data);
  }

  async findOne(id: number) {
    const photo = await this.photoRepository.findByPk(id);
    if (!photo) throw new NotFoundException();
    return photo;
  }
}
