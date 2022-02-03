/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length, IsOptional } from 'class-validator';
export class CreateRoleDto {
  @ApiProperty()
  @Length(1, 128)
  title: string;

  @ApiProperty()
  @Length(1, 128)
  label: string;

  @ApiPropertyOptional({ type: 'boolean', default: false })
  @IsOptional()
  allowAny = false;

  @ApiProperty()
  @IsOptional()
  permissions: number[];
}
