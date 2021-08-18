/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { Length, IsOptional } from 'class-validator'
export class CreateRoleDto {
    @ApiProperty()
    @Length(1, 128)
    title: string;

    @ApiProperty()
    @Length(1, 128)
    label: string;

    @ApiProperty()
    @IsOptional()
    permissions: number[]
}
