/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ID = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): number => {
        const request = ctx.switchToHttp().getRequest();
        return Number(request.params.id);
    },
)
