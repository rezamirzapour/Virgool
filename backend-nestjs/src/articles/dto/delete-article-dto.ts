/* eslint-disable prettier/prettier */
import { IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class DeleteArticleDto {

    // @IsInt()
    @ApiProperty({ type: 'integer', required: true })
    id: number;
}