/* eslint-disable prettier/prettier */

import { HttpStatus } from '@nestjs/common';

export class CreateResponse<T = any> {
    constructor(
        public result: T,
        public message: string = "با موفقیت ایجاد شد",
        public status: number = HttpStatus.CREATED,
    ) { }
}