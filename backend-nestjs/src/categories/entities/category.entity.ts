/* eslint-disable prettier/prettier */
import { Table, Model, PrimaryKey, Column, AutoIncrement, BelongsToMany } from 'sequelize-typescript'
import { Article, ArticleCategory } from 'articles/entities'
@Table({ tableName: 'categories' })
export class Category extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;


    @Column
    title: string;

    @BelongsToMany(() => Article, () => ArticleCategory)
    articles: Article[]
}
