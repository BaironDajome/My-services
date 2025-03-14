/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNumber, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateCaracteristicaDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty()
  @IsNumber()
  bahiaId: number;
}
