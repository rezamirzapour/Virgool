/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class AddUsersDto {
    @ApiProperty()
    userId: number[]
}