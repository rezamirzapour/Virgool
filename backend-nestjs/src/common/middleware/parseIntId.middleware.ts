/* eslint-disable prettier/prettier */
import { NestMiddleware, Injectable } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class ParseIntIdMiddleware implements NestMiddleware {
  use(request, response: Response, next: NextFunction) {
    const id = request.params.id;
    request.params.id = parseInt(id);

    next();
  }
}
