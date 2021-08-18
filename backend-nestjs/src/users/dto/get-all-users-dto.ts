/* eslint-disable prettier/prettier */
import { IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllUsersDto {
    @IsOptional()
    @ApiPropertyOptional({ type: 'integer', default: 10, required: false })
    size: number;

    @IsOptional()
    @ApiPropertyOptional({ type: 'integer', default: 0, required: false })
    offset: number;

    @IsOptional()
    @ApiPropertyOptional({ default: true, required: false })
    paginate: boolean;

    @IsOptional()
    @ApiPropertyOptional({ required: false })
    firstName?: string;

    @IsOptional()
    @ApiPropertyOptional({ required: false })
    lastName?: string;

    @IsOptional()
    @IsEmail()
    @ApiPropertyOptional({ required: false })
    email?: string;

    @IsOptional()
    @ApiPropertyOptional({ required: false, enum: ['true', 'false'] })
    isEmailVerified?: string;

    @IsOptional()
    @ApiPropertyOptional({ required: false, enum: ['true', 'false'] })
    isPhoneNumberVerified?: string;
}