/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  // @Length(8)
  password: string;
}
