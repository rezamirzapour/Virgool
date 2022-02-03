/* eslint-disable prettier/prettier */
import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  Column,
} from 'sequelize-typescript';
import { User, Article } from 'database/database.entities';

@Table({ tableName: 'favorites', createdAt: false, updatedAt: false })
export class Favorite extends Model {
  @ForeignKey(() => Article)
  @Column
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
