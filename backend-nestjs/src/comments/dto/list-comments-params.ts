/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer'
import { ListParams } from 'common/dto'
export class ListCommentsParams extends ListParams {
    @ApiPropertyOptional()
    @Type(() => Number)
    articleId?: number

    @ApiPropertyOptional()
    @Type(() => Number)
    userId?: number;
}