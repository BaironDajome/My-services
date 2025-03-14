import { PartialType } from '@nestjs/mapped-types';
import { CreateBahiaDto } from './create-bahia.dto';

export class UpdateBahiaDto extends PartialType(CreateBahiaDto) {}
