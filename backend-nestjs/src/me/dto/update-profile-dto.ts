/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateProfileDto {
  @ApiPropertyOptional({ required: false })
  email: string;

  @ApiPropertyOptional({ required: false })
  password: string;

  @ApiPropertyOptional({ required: false })
  description: string;

  @ApiPropertyOptional({ required: false })
  phoneNumber: string;

  @Transform(() => Number)
  @ApiPropertyOptional({ required: false })
  avatarId: number;
}
