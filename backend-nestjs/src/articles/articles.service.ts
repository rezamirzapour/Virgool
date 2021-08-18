/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize'
import { Article, Category, User } from 'database/database.entities';
import { GetAllArticlesDto, CreateArticleDto, UpdateArticleDto } from './dto';
import { PaginateResponse, FindAllResponse, FindOneResponse, DestroyResponse, CreateResponse, UpdateResponse } from 'common/httpResponse';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article) private articleModel: typeof Article,
        @InjectModel(Category) private readonly categoryModel: typeof Category
    ) { }

    async findAll(getAllArticlesDto: GetAllArticlesDto) {
        const { size, offset, paginate, ...otherOptions } = getAllArticlesDto;
        const paginateOptions = { offset, limit: size }
        const options = { where: {} };
        if (otherOptions.title)
            options.where = { ...options.where, title: { [Op.like]: `%${otherOptions.title}%` } }

        if (otherOptions.startDate)
            options.where = { ...options.where, createdAt: { [Op.gte]: otherOptions.startDate } }

        if (otherOptions.endDate)
            options.where = { ...options.where, createdAt: { [Op.lte]: otherOptions.endDate } }

        if (otherOptions.status)
            options.where = { ...options.where, status: otherOptions.status }

        if (otherOptions.startLikeCount && otherOptions.endLikeCount)
            options.where = { ...options.where, likeCount: { [Op.gte]: +otherOptions.startLikeCount, [Op.lte]: +otherOptions.endLikeCount } }


        if (paginate) {
            const result = await this.articleModel.findAndCountAll({
                ...paginateOptions, ...options, attributes: { exclude: ['authorId', 'thumbnailId'] },
                include: [
                    {
                        model: Category,
                        attributes: ["id", 'title'],
                        through: { attributes: [] }
                    }, {
                        model: User,
                        attributes: ['id', 'email', 'firstName', 'lastName'],
                        include: ['avatar']
                    },
                    'thumbnail'
                ]
            })
            return new PaginateResponse(result.rows, result.count)
        }

        const result = await this.articleModel.findAll(options);
        return new FindAllResponse(result);
    }

    async findOne(id: number): Promise<Article> {
        try {
            const article = await this.articleModel.findByPk<Article>(id, {
                attributes: { exclude: ['thumbnailId', 'authorId'] },
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }, {
                    model: Category,
                    attributes: ['id', 'title'],
                    through: { attributes: [] }
                }, 'thumbnail'
                ]
            });
            if (!article)
                throw new NotFoundException();
            return article
        } catch (error) {
            throw error;
        }
    }

    async destroy(id: number) {
        const article = await this.articleModel.findByPk(id)
        if (!article)
            throw new NotFoundException();
        await this.articleModel.destroy({ where: { id } });
        return true;
    }

    async create(createArticleDto: CreateArticleDto, author) {
        try {
            const article = await this.articleModel.create(createArticleDto);
            article.$set("author", author)
            if (createArticleDto.categories) {
                article.$set("categories", createArticleDto.categories.map(c => +c))
            }
            return article;
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async update(id: number, updateArticleDto: UpdateArticleDto, author: User) {
        try {
            const article = await this.articleModel.findByPk(id);
            this.articleModel.update({ ...updateArticleDto, authorId: author.id }, { where: { id } });
            if (updateArticleDto.categories)
                article.$set('categories', updateArticleDto.categories.map(id => +id))
            return article;
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
