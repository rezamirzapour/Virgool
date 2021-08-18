/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class GetAllCommentsDto {
    @ApiProperty()
    paginate: boolean;

    @ApiProperty()
    size: number;

    @ApiProperty()
    offset: number;

    @ApiProperty({ required: false })
    articleId: number

    @ApiProperty({ required: false })
    userId: number;
}