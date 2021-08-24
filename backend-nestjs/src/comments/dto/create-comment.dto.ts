/* eslint-disable prettier/prettier */
import { IsInt } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
export class CreateCommentDto {
    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    articleId: number;

    @ApiProperty()
    content: string;

    @ApiProperty({ nullable: true })
    @Type(() => Number)
    parentId: number | null;
}
