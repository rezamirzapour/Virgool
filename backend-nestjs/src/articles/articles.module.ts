/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article, ArticleCategory, Category } from 'database/database.entities';
import { DatabaseModule } from 'database/database.module'
@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [SequelizeModule.forFeature([Article]), ArticlesService],
  imports: [DatabaseModule, SequelizeModule, Article, SequelizeModule.forFeature([Article, ArticleCategory, Category])]
})
export class ArticlesModule { }
