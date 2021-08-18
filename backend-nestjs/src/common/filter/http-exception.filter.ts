/* eslint-disable prettier/prettier */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

const MESSAGES = {
    [HttpStatus.NOT_FOUND]: "موردی یافت نشد",
    [HttpStatus.FORBIDDEN]: "اجازه دسترسی ندارید",
    [HttpStatus.INTERNAL_SERVER_ERROR]: "خطای داخلی سیستم",
    [HttpStatus.UNAUTHORIZED]: "عدم احراز هویت",
    [HttpStatus.BAD_REQUEST]: "محتوای نادرست",
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        return response
            .status(status)
            .json({
                status,
                message: MESSAGES?.[status] ?? 'خطایی وجود دارد',
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}