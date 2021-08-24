/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ListParams } from 'common/dto'

export class ListRolesParams extends ListParams {
    @ApiProperty({ required: false })
    @IsOptional()
    title: string;

    @ApiProperty({ required: false })
    @IsOptional()
    label: string;
}