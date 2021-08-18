/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
export class CreateCommentDto {
    @ApiProperty()
    articleId: number;

    @ApiProperty()
    content: string;

    @ApiProperty({ nullable: true })
    parentId: number | null;
}
