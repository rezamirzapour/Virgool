/* eslint-disable prettier/prettier */
import { IsInt, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetAllArticlesDto {
    @ApiProperty({ default: 10, required: false, type: 'integer' })
    @IsInt()
    size: number;

    @ApiProperty({ default: 0, required: false, type: 'integer' })
    @IsInt()
    offset: number;

    @ApiProperty({ required: false, default: true })
    paginate: true;

    @ApiProperty({ required: false })
    @IsOptional()
    title?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    startDate?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ required: false, enum: ['published', 'unpublished'] })
    @IsOptional()
    status?: "published" | "unpublished";

    @ApiProperty({ required: false, type: 'integer' })
    startLikeCount?: number;


    @ApiProperty({ required: false, type: 'integer' })
    endLikeCount?: number;
}