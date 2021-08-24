/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length, IsInt, IsArray, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger'
export class CreateArticleDto {
    @IsNotEmpty()
    @Length(1, 128)
    @ApiProperty({ minLength: 1, maxLength: 128 })
    title: string;

    @IsNotEmpty()
    @ApiProperty()
    content: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({ required: false, nullable: true, default: null, })
    @Type(() => Number)
    thumbnailId?: number | null;

    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    @ApiProperty({ required: false })
    @Type(() => Number)
    categories?: number[];
}