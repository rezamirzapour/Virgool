/* eslint-disable prettier/prettier */
import { IsInt, IsBoolean, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger';
export class ListParams {
    @ApiPropertyOptional({ default: 10, type: 'integer' })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    // @Transform(({ value }) => +value)
    size = 10

    @ApiPropertyOptional({ default: 0, type: 'integer' })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    // @Transform(({ value }) => +value)
    offset = 0

    @ApiPropertyOptional({ default: true, type: 'boolean' })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    // @Transform(({ value }) => value === 'true')
    paginate = true
}
