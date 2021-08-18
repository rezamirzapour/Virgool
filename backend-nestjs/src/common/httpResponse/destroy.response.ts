/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common';

export class DestroyResponse {
    constructor(
        public message: string = "با موفقیت حذف شد",
        public status: number = HttpStatus.OK
    ) { }
}
