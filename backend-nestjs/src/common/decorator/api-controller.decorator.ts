/* eslint-disable prettier/prettier */
import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
export function ApiController(name: string) {
    return applyDecorators(
        ApiTags(name.replace(name[0], name[0].toUpperCase())),
        Controller(`api/${name}`)
    );
}