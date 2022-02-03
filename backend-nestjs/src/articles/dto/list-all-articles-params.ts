/* eslint-disable prettier/prettier */
import { IsInt, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ListParams } from 'common/dto';

export class ListAllArticlesParams extends ListParams {
  @ApiProperty({ required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty({ required: false, enum: ['published', 'unpublished'] })
  @IsOptional()
  status?: 'published' | 'unpublished';

  @ApiProperty({ required: false, type: 'integer' })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  startLikeCount?: number;

  @ApiProperty({ required: false, type: 'integer' })
  @IsOptional()
  @Type(() => Number)
  endLikeCount?: number;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Number)
  categories?: number[];
}
