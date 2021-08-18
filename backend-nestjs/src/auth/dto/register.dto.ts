/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail } from 'class-validator';

export class RegisterDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    // @Length(8)
    password: string;
}