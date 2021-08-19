/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class GetFollowingsQuery {
    @ApiProperty({ default: 10, required: false, type: 'integer' })
    size: number;

    @ApiProperty({ default: 0, required: false, type: 'integer' })
    offset: number;

    @ApiProperty({ required: false, default: true })
    paginate: true;

}