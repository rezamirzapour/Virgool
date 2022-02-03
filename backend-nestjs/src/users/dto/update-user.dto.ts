/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ required: false })
  firstName?: string;

  @ApiPropertyOptional({ required: false })
  lastName?: string;

  @ApiPropertyOptional({ required: false })
  description?: string;

  @ApiPropertyOptional({ required: false, default: null })
  avatarId?: number;
}
