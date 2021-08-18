/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto, GetAllCategoriesDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize'
import { Category } from 'database/database.entities';
import { FindAllResponse, PaginateResponse } from 'common/httpResponse';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.create(createCategoryDto);
    return category;
  }

  async findAll(getAllCategoriesDto: GetAllCategoriesDto) {
    const { size, offset, paginate, ...otherOptions } = getAllCategoriesDto;
    const paginatoinOptions = { offset, limit: size };
    const options = { where: {} }

    if (otherOptions.title)
      options.where = { ...options.where, title: { [Op.like]: `%${otherOptions.title}%` } }

    if (paginate) {
      const result = await this.categoryModel.findAndCountAll({ ...options, ...paginatoinOptions })
      return new PaginateResponse(result.rows, result.count)
    }
    const result = await this.categoryModel.findAll(options)
    return new FindAllResponse(result)
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id)
    if (!category)
      throw new NotFoundException()
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryModel.update(updateCategoryDto, { where: { id } })
    return true
  }

  async remove(id: number) {
    const category = await this.findOne(id)
    await category.destroy()
    return true;
  }
}
