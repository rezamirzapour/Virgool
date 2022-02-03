/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ListParams } from 'common/dto';

export class ListCategoriesParams extends ListParams {
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;
}
