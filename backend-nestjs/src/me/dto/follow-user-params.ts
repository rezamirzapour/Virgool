/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class FollowUserParams {
  @ApiProperty({ type: 'integer' })
  userId: number;
}
