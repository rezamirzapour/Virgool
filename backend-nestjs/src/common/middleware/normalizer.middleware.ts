/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class NormalizerMilddleware implements NestMiddleware {
    use(req, res: Response, next: NextFunction) {
        const offset = req.query.offset
        const size = req.query.size
        const paginate = req.query.paginate
        req.query.offset = !isNaN(offset) ? Number(offset) : 0
        req.query.size = !isNaN(size) ? Number(size) : 10
        req.query.paginate = paginate === 'false' ? false : true
        next();
    }
}
