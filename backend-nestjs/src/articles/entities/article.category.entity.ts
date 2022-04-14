/* eslint-disable prettier/prettier */
import {
  Table,
  Model,
  ForeignKey,
  Column,
  BelongsTo,
} from 'sequelize-typescript';
import { Article } from './article.entity';
import { Category } from 'src/categories/entities/category.entity';

@Table({ tableName: 'articleCategory', createdAt: false, updatedAt: false })
export class ArticleCategory extends Model {
  @ForeignKey(() => Article)
  @Column
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
