/* eslint-disable prettier/prettier */
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';
import { Article, ArticleCategory, Category } from 'database/database.entities';
import { DatabaseModule } from 'database/database.module';
import { CategoriesService } from 'categories/categories.service';
@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesResolver, CategoriesService],
  exports: [SequelizeModule.forFeature([Article]), ArticlesService],
  imports: [
    DatabaseModule,
    SequelizeModule,
    Article,
    SequelizeModule.forFeature([Article, ArticleCategory, Category]),
  ],
})
export class ArticlesModule {}
