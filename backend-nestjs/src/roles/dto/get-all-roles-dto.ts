/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetAllRolesDto {
    @ApiProperty({ type: 'integer', default: 10, required: false })
    @IsOptional()
    size: number;

    @ApiProperty({ type: 'integer', default: 0, required: false })
    @IsOptional()
    offset: number;

    @ApiProperty({ default: true })
    @IsOptional()
    paginate: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    title: string;

    @ApiProperty({ required: false })
    @IsOptional()
    label: string;
}