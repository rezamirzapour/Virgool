/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  ListCategoriesParams,
} from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Category } from 'src/database/database.entities';
import { FindAllResponse, PaginateResponse } from 'src/common/httpResponse';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.create(createCategoryDto);
    return category;
  }

  async findAll(listCategoriesParams: ListCategoriesParams) {
    const { size, offset, paginate, ...otherOptions } = listCategoriesParams;
    const paginatoinOptions = { offset, limit: size };
    const options = { where: {} };

    if (otherOptions.title)
      options.where = {
        ...options.where,
        title: { [Op.like]: `%${otherOptions.title}%` },
      };

    if (paginate) {
      const result = await this.categoryModel.findAndCountAll({
        ...options,
        ...paginatoinOptions,
      });
      return new PaginateResponse(result.rows, result.count);
    }
    const result = await this.categoryModel.findAll(options);
    return new FindAllResponse(result);
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) throw new NotFoundException();
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryModel.update(updateCategoryDto, { where: { id } });
    return true;
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await category.destroy();
    return true;
  }
}
