/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class GetAllPermissionDto {
    @ApiProperty({ type: 'integer', required: false, default: 10 })
    @IsOptional()
    size: number;

    @ApiProperty({ type: 'integer', required: false, default: 0 })
    @IsOptional()
    offset: number;

    @ApiProperty({ default: true, required: false, })
    @IsOptional()
    paginate: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    title: string;
}