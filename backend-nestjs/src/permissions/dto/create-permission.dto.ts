/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
export class CreatePermissionDto {
  @ApiProperty()
  @Length(1, 128)
  title: string;
}
