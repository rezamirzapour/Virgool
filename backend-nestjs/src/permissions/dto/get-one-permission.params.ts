/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
export class GetOnePermissionParams {
    @ApiProperty({ type: 'integer', required: true })
    id: number;
}