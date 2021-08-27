/* eslint-disable prettier/prettier */
import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
export function ApiController(name: string) {
    return applyDecorators(
        ApiTags(`${name[0].toUpperCase()}${name.slice(1)}`),
        Controller(`api/${name}`)
    );
}