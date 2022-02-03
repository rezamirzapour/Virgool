/* eslint-disable prettier/prettier */
import {
  createParamDecorator,
  ExecutionContext,
  NotAcceptableException,
} from '@nestjs/common';

export const ID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    const val = parseInt(request.params.id);
    if (Number.isNaN(val)) throw new NotAcceptableException();
    return val;
  },
);
