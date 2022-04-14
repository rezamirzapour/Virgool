/* eslint-disable prettier/prettier */
import {
  Table,
  AutoIncrement,
  Model,
  Column,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AllowNull,
  Default,
  DataType,
} from 'sequelize-typescript';
import { User, Article } from 'src/database/database.entities';

@Table({ tableName: 'comments' })
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @Column(DataType.TEXT)
  content: string;

  @AllowNull
  @Column
  parentId: number;

  @Default(false)
  @Column
  accepted: boolean;

  @ForeignKey(() => Article)
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;
}
