/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, FindOptions } from 'sequelize';
import { Article, Category, User } from 'src/database/database.entities';
import {
  ListAllArticlesParams,
  CreateArticleDto,
  UpdateArticleDto,
} from './dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article) private readonly articleModel: typeof Article,
  ) {}

  generateAllOptions({
    title,
    startDate,
    endDate,
    status,
    startLikeCount,
    endLikeCount,
    categories,
  }: ListAllArticlesParams) {
    const [whereBe, where]: Record<string, any>[] = [
      {
        title: { [Op.like]: `%${title}%` },
        [Op.gte]: startDate,
        [Op.lte]: endDate,
        status,
      },
      {},
    ];

    [title, startDate, endDate, status].filter(Boolean).forEach((item) => {
      where[item as string] = whereBe[item as string];
    });

    if (startLikeCount && endLikeCount)
      where.likeCount = {
        [Op.gte]: +startLikeCount,
        [Op.lte]: +endLikeCount,
      };

    const options: FindOptions = {
      where,
      attributes: { exclude: ['authorId', 'thumbnailId'] },
      include: [
        {
          model: Category,
          attributes: ['id', 'title'],
          through: { attributes: [] },
          ...(categories && {
            id: { [Op.in]: categories?.map?.((c) => +c) ?? [] },
          }),
        },
        {
          model: User,
          attributes: ['id', 'email', 'firstName', 'lastName'],
          include: ['avatar'],
        },
        'thumbnail',
      ],
    };
    return options;
  }

  async paginateAll(listAllArticlesParams: ListAllArticlesParams) {
    let options = this.generateAllOptions(listAllArticlesParams);
    const { size, offset } = listAllArticlesParams;
    const paginateOptions = { offset, limit: size };
    options = {
      ...options,
      ...paginateOptions,
    };
    return this.articleModel.findAndCountAll(options);
  }

  async findAll(listAllArticlesParams: ListAllArticlesParams) {
    const options = this.generateAllOptions(listAllArticlesParams);
    return this.articleModel.findAll(options);
  }

  async findOne(id: number): Promise<Article> {
    try {
      const article = await this.articleModel.findByPk<Article>(id, {
        attributes: { exclude: ['thumbnailId', 'authorId'] },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
          {
            model: Category,
            attributes: ['id', 'title'],
            through: { attributes: [] },
          },
          'thumbnail',
        ],
      });
      if (!article) throw new NotFoundException();
      return article;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: number) {
    const article = await this.articleModel.findByPk(id);
    if (!article) throw new NotFoundException();
    await this.articleModel.destroy({ where: { id } });
    return true;
  }

  async create(createArticleDto: CreateArticleDto, author: User) {
    try {
      const article = await this.articleModel.create(createArticleDto);
      article.$set('authorId', author.id);
      if (createArticleDto.categories) {
        article.$set('categories', createArticleDto.categories);
      }
      return article;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto, author: User) {
    try {
      const article = await this.articleModel.findByPk(id);
      this.articleModel.update(
        { ...updateArticleDto, authorId: author.id },
        { where: { id } },
      );
      if (updateArticleDto.categories)
        article.$set(
          'categories',
          updateArticleDto.categories.map((id) => +id),
        );
      return article;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
