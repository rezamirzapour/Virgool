/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length, IsInt, IsArray, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class CreateArticleDto {
    @IsNotEmpty()
    @Length(1, 128)
    @ApiProperty({ maxLength: 128 })
    title: string;

    @IsNotEmpty()
    @ApiProperty()
    content: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({ required: false, nullable: true, default: null, })
    thumbnailId?: number | null;

    @IsArray()
    @IsOptional()
    @ApiProperty({ required: false })
    categories?: number[];
}