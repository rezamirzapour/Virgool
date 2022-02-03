/* eslint-disable prettier/prettier */
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleDetailsParams {
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ type: 'integer', required: true })
  id: number;
}
