/* eslint-disable prettier/prettier */
import { Resolver, Int, Args, Query } from '@nestjs/graphql';
import { CategoriesService } from 'categories/categories.service';
import { Article } from 'database/database.entities';
import { ArticlesService } from './articles.service';

@Resolver((of) => Article)
export class ArticlesResolver {
  constructor(
    private articlesService: ArticlesService,
    private categoriesService: CategoriesService,
  ) {}

  @Query((returns) => Article)
  async article(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.findOne(id);
  }

  //   @ResolveField()
  //   async articles(@Parent() article: Article) {
  //     const { id } = Article;
  //     return this.categoriesService.findAll({ articleId: id });
  //   }
}
