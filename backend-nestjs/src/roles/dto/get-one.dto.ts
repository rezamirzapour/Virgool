/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class GetOneRoleDto {
    @ApiProperty({ type: 'integer', required: true })
    id: number;
}