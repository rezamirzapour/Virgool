/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { ListParams } from 'common/dto';
export class ListUsersParams extends ListParams {
  @IsOptional()
  @ApiPropertyOptional()
  firstName?: string;

  @IsOptional()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @ApiPropertyOptional({ type: 'boolean' })
  @Type(() => Boolean)
  isEmailVerified?: boolean;

  @IsOptional()
  @ApiPropertyOptional({ type: 'boolean' })
  @Type(() => Boolean)
  isPhoneNumberVerified?: boolean;
}
