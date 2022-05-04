/* eslint-disable prettier/prettier */
import { Body, Param, Query, ValidationPipe, HttpCode } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  CreateArticleDto,
  ListAllArticlesParams,
  ArticleDetailsParams,
  UpdateArticleDto,
} from './dto';
import {
  ApiController,
  GetAllMethod,
  GetOneMethod,
  PostMethod,
  DeleteMethod,
  PutMethod,
  ID,
  User,
} from 'src/common/decorator';
import {
  FindOneResponse,
  CreateResponse,
  DestroyResponse,
  UpdateResponse,
  FindAllResponse,
  PaginateResponse,
} from 'src/common/httpResponse';
@ApiController('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @HttpCode(201)
  // @ApiConsumes('multipart/form-data', 'application/json')
  @PostMethod()
  async create(
    @Body(new ValidationPipe({ transform: true }))
    createArticleDto: CreateArticleDto,
    @User() user,
  ) {
    const result = await this.articleService.create(createArticleDto, user);
    return new CreateResponse(result);
  }

  @GetOneMethod(':id')
  async findOne(@Param() params: ArticleDetailsParams, @ID() id) {
    const result = await this.articleService.findOne(id);
    return new FindOneResponse(result);
  }

  @GetAllMethod()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    listAllArticlesParams: ListAllArticlesParams,
  ) {
    if (listAllArticlesParams.paginate) {
      const response = await this.articleService.paginateAll(
        listAllArticlesParams,
      );
      return new PaginateResponse(response.rows, response.count);
    }
    const response = await this.articleService.findAll(listAllArticlesParams);
    return new FindAllResponse(response);
  }

  @DeleteMethod(':id')
  async destroy(@Param(ValidationPipe) params: ArticleDetailsParams, @ID() id) {
    await this.articleService.destroy(id);
    return new DestroyResponse();
  }

  @PutMethod(':id')
  async update(
    @Param(ValidationPipe) params: ArticleDetailsParams,
    @Body(ValidationPipe) updateArticleDto: UpdateArticleDto,
    @ID() id,
    @User() user,
  ) {
    await this.articleService.update(id, updateArticleDto, user);
    return new UpdateResponse();
  }
}
