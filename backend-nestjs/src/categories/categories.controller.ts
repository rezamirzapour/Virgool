/* eslint-disable prettier/prettier */
import { Body, ValidationPipe, Query, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto, GetAllCategoriesDto } from './dto';
import { ApiController, GetAllMethod, GetOneMethod, PostMethod, PutMethod, DeleteMethod, ID } from 'common/decorator'
import { CreateResponse, FindOneResponse, UpdateResponse } from 'common/httpResponse'

@ApiController('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @PostMethod()
  async create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto, @Res() res) {
    const result = await this.categoriesService.create(createCategoryDto);
    return res.status(201).json(new CreateResponse(result))
  }

  @GetAllMethod()
  async findAll(@Query(ValidationPipe) getAllCategoriesDto: GetAllCategoriesDto) {
    return this.categoriesService.findAll(getAllCategoriesDto);
  }

  @GetOneMethod(':id')
  async findOne(@ID() id: number) {
    const result = await this.categoriesService.findOne(id);
    return new FindOneResponse(result)
  }

  @PutMethod(':id')
  async update(@ID() id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    await this.categoriesService.update(+id, updateCategoryDto);
    return new UpdateResponse()
  }

  @DeleteMethod(':id')
  remove(@ID() id: number) {
    return this.categoriesService.remove(id);
  }
}
