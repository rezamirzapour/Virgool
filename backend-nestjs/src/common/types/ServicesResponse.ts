/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common';

export class FindAllResult<T = any> {
    constructor(
        public result: T[],
        public count: number,
        public message: string = "با موفقیت بازیابی شد",
        public status: number = HttpStatus.OK
    ) { }
}

export class FindOneResult<T = any> {
    constructor(
        public result: T,
        public message: string = "با موفقیت بازیابی شد",
        public status: number = HttpStatus.OK
    ) { }
}

export class DestroyResult {
    constructor(
        public message: string = "با موفقیت حذف شد",
        public status: number = HttpStatus.OK
    ) { }
}

export class CreateResult {
    constructor(
        public message: string = "با موفقیت ایجاد",
        public status: number = HttpStatus.CREATED
    ) { }
}