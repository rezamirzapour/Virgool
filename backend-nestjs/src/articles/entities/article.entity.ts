/* eslint-disable prettier/prettier */
import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
  DataType,
  Length,
  BelongsToMany,
  Default,
  HasMany,
} from 'sequelize-typescript';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  User,
  Photo,
  ArticleCategory,
  Category,
  Comment,
} from 'src/database/database.entities';

type Status = 'published' | 'unpublished';

@ObjectType()
@Table({ tableName: 'articles' })
export class Article extends Model {
  @Field((type) => Int)
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Field()
  @Unique
  @Length({ max: 128 })
  @Column
  title: string;

  @Field({ nullable: true })
  @AllowNull
  @Column(DataType.TEXT)
  content: string;

  @Field({ nullable: true })
  @AllowNull
  @Column(DataType.TEXT)
  plainContent: string;

  @Field((type) => Int)
  @Default(0)
  @Column
  likeCount: number;

  @Field()
  @Default('published')
  @Column(DataType.STRING)
  status: Status;

  @Field((type) => Int, { nullable: true })
  @AllowNull
  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @Field((type) => Int, { nullable: true })
  @ForeignKey(() => Photo)
  @AllowNull
  @Column
  thumbnailId: number;

  @BelongsTo(() => Photo)
  thumbnail: Photo;

  @BelongsToMany(() => Category, () => ArticleCategory)
  categories: Category[];

  @HasMany(() => Comment)
  comments: Comment[];
}
