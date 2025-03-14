import { PartialType } from '@nestjs/mapped-types';
import { CreateGeojsonCaracteristicaDto } from './create-geojson-caracteristica.dto';

export class UpdateGeojsonCaracteristicaDto extends PartialType(CreateGeojsonCaracteristicaDto) {}
