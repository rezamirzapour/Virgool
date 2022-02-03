/* eslint-disable prettier/prettier */

import { HttpStatus } from '@nestjs/common';

export class FindOneResponse<T = any> {
  constructor(
    public result: T,
    public message: string = 'با موفقیت بازیابی شد',
    public status: number = HttpStatus.OK,
  ) {}
}
