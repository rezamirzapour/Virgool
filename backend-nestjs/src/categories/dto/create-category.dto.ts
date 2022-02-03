/* eslint-disable prettier/prettier */

import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
  @ApiProperty()
  @Length(1, 128)
  title: string;
}
