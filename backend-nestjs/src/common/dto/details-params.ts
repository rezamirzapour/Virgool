/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
export class DetailsParams {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    id: number
}