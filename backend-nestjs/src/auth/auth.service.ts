/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password))
            return user;

        return null;
    }

    async login({ email, password }: LoginDto) {
        const user = await this.validateUser(email, password)
        if (!user)
            throw new UnauthorizedException()

        const payload = { email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}