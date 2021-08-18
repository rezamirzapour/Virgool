/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { UsersService } from 'users/users.service';
import { User } from 'database/database.entities';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret,
        });
    }

    async authenticate(req: Request) {
        return super.authenticate(req);
    }

    async validate(payload: any): Promise<User> {
        // payload is decoded data extracted from jwt 
        const user = await this.usersService.findByEmail(payload.email);
        delete user.password;
        return user;
    }
}