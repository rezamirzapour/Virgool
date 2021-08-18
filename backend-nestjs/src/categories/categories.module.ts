import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity'
@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [SequelizeModule.forFeature([Category])]
})
export class CategoriesModule { }
