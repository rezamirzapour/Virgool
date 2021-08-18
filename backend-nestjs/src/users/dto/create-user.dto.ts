/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
export class CreateUserDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    // @IsEmail()
    email: string;

    @ApiProperty()
    // @Length(8)
    password: string;
}
