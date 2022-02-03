/* eslint-disable prettier/prettier */
import { Article, User } from 'database/database.entities';
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ tableName: 'bookmark' })
export class Bookmark extends Model {
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Article)
  @Column
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
