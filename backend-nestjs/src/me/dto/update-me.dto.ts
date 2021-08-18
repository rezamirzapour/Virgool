import { PartialType } from '@nestjs/swagger';
import { CreateMeDto } from './create-me.dto';

export class UpdateMeDto extends PartialType(CreateMeDto) {}
