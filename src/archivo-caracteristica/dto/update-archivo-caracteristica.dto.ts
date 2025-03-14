import { PartialType } from '@nestjs/mapped-types';
import { CreateArchivoCaracteristicaDto } from './create-archivo-caracteristica.dto';

export class UpdateArchivoCaracteristicaDto extends PartialType(CreateArchivoCaracteristicaDto) {}
