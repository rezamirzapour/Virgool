/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { UsersService } from 'users/users.service';
import { User } from 'database/database.entities';

const getJwtFromCookieOrHeader = (req: Request) => {
    const accessTokenFromCookie = req.cookies['access_token']
    const accessTokenFromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    return accessTokenFromCookie || accessTokenFromAuthHeaderAsBearerToken
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: getJwtFromCookieOrHeader,
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret,
        });
    }

    async authenticate(req: Request) {
        await super.authenticate(req);
    }

    async fail(error) {
        throw (error)
    }

    async validate(payload: any): Promise<User> {
        // payload is decoded data extracted from jwt
        const user = await this.usersService.findByEmail(payload.email);
        delete user.password;
        return user;
    }
}