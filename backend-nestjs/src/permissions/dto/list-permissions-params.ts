/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { ListParams } from 'common/dto'
export class ListPermissoinsParams extends ListParams {
    @ApiProperty({ required: false })
    @IsOptional()
    title: string;
}