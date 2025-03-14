/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateBahiaDto {
  @IsString()
  nombre: string;
}
