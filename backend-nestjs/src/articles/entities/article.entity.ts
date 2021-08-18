/* eslint-disable prettier/prettier */
import { Table, Model, PrimaryKey, AutoIncrement, Unique, Column, AllowNull, ForeignKey, BelongsTo, DataType, Length, BelongsToMany, Default, HasMany } from 'sequelize-typescript';
import { User, Photo, ArticleCategory, Category, Comment } from 'database/database.entities'

type Status = 'published' | 'unpublished'

@Table({ tableName: 'articles' })
export class Article extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Unique
    @Length({ max: 128 })
    @Column
    title: string;

    @AllowNull
    @Column(DataType.TEXT)
    content: string;

    @Default(0)
    @Column
    likeCount: number;

    @Default('published')
    @Column(DataType.STRING)
    status: Status

    @AllowNull
    @ForeignKey(() => User)
    @Column
    authorId: number;

    @BelongsTo(() => User)
    author: User;

    @ForeignKey(() => Photo)
    @AllowNull
    @Column
    thumbnailId: number;

    @BelongsTo(() => Photo)
    thumbnail: Photo;

    @BelongsToMany(() => Category, () => ArticleCategory)
    categories: Category[]

    @HasMany(() => Comment)
    comments: Comment[];
}