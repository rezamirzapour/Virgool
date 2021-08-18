/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('\n');
        console.log('Request Method ->', req.method);
        console.log('Request Query ->', req.query);
        console.log('Request Body ->', req.body);
        console.log('Request Path ->', req.path);
        console.log('Request Authorization: ->', req.headers.authorization);
        console.log('\n');
        next();
    }
}
