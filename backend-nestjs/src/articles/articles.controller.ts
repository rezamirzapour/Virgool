/* eslint-disable prettier/prettier */
import { Body, HttpStatus, Param, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service'
import { CreateArticleDto, GetAllArticlesDto, DeleteArticleDto, UpdateArticleDto } from './dto'
import { ApiController, GetAllMethod, GetOneMethod, PostMethod, DeleteMethod, PutMethod, ID, User } from 'common/decorator';
import { FindOneResponse, CreateResponse, DestroyResponse, UpdateResponse } from 'common/httpResponse';
import { Response } from 'express';

@ApiController("articles")
export class ArticlesController {
    constructor(private articleService: ArticlesService) { }

    @UsePipes(ValidationPipe)
    // @ApiConsumes('multipart/form-data', 'application/json')
    @PostMethod()
    async create(
        @Body(new ValidationPipe({ transform: true })) createArticleDto: CreateArticleDto,
        @Res() res: Response,
        @User() user
    ) {
        const result = await this.articleService.create(createArticleDto, user)
        return res.status(HttpStatus.CREATED).json(new CreateResponse(result));
    }

    @GetOneMethod(":id")
    async findOne(@Param() params: DeleteArticleDto, @ID() id) {
        const result = await this.articleService.findOne(id);
        return new FindOneResponse(result)
    }

    @GetAllMethod()
    async findAll(@Query(ValidationPipe) getAllArticlesDto: GetAllArticlesDto) {
        return this.articleService.findAll(getAllArticlesDto);
    }

    @DeleteMethod(':id')
    async destroy(@Param(ValidationPipe) params: DeleteArticleDto, @ID() id) {
        await this.articleService.destroy(id);
        return new DestroyResponse();
    }

    @PutMethod(':id')
    async update(
        @Param(ValidationPipe) params: DeleteArticleDto,
        @Body(ValidationPipe) updateArticleDto: UpdateArticleDto,
        @ID() id,
        @User() user
    ) {
        await this.articleService.update(id, updateArticleDto, user);
        return new UpdateResponse()
    }

    @GetAllMethod('tops')
    async findTopArticles(@Query(ValidationPipe) getAllArticlesDto: GetAllArticlesDto) {
        return this.articleService.findAll(getAllArticlesDto);
    }
}