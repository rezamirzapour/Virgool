/* eslint-disable prettier/prettier */
import { Body, ValidationPipe, Query, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  ListCategoriesParams,
} from './dto';
import {
  ApiController,
  GetAllMethod,
  GetOneMethod,
  PostMethod,
  PutMethod,
  DeleteMethod,
  ID,
} from 'common/decorator';
import {
  CreateResponse,
  FindOneResponse,
  UpdateResponse,
} from 'common/httpResponse';

@ApiController('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpCode(201)
  @PostMethod()
  async create(
    @Body(new ValidationPipe({ transform: true }))
    createCategoryDto: CreateCategoryDto,
  ) {
    const result = await this.categoriesService.create(createCategoryDto);
    return new CreateResponse(result);
  }

  @GetAllMethod()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    listCategoriesParams: ListCategoriesParams,
  ) {
    return this.categoriesService.findAll(listCategoriesParams);
  }

  @GetOneMethod(':id')
  async findOne(@ID() id: number) {
    const result = await this.categoriesService.findOne(id);
    return new FindOneResponse(result);
  }

  @PutMethod(':id')
  async update(
    @ID() id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.categoriesService.update(id, updateCategoryDto);
    return new UpdateResponse();
  }

  @DeleteMethod(':id')
  remove(@ID() id: number) {
    return this.categoriesService.remove(id);
  }
}
