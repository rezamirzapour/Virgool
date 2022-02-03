/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class GetOneUserDto {
  @ApiProperty({ type: 'integer', required: true })
  id: number;
}
