/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetAllCategoriesDto {

    @IsOptional()
    @ApiProperty({ default: 10, required: false, type: 'integer' })
    size?: number;

    @IsOptional()
    @ApiProperty({ default: 0, required: false, type: 'integer' })
    offset?: number;

    @IsOptional()
    @ApiProperty({ default: true, required: false })
    paginate?: boolean;

    @IsOptional()
    @ApiProperty({ required: false })
    title?: string;


}