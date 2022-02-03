/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article-dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
