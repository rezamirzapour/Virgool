/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';
import {
  Article,
  ArticleCategory,
  Category,
} from 'src/database/database.entities';
import { DatabaseModule } from 'src/database/database.module';
import { CategoriesService } from 'src/categories/categories.service';
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
