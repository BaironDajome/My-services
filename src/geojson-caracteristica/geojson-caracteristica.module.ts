/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GeojsonCaracteristicaService} from './geojson-caracteristica.service';
import { GeojsonCaracteristicaController } from './geojson-caracteristica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeojsonCaracteristica } from './entities/geojson-caracteristica.entity';
import { CaracteristicaModule } from 'src/caracteristica/caracteristica.module';
import { ArchivoCaracteristica } from 'src/archivo-caracteristica/entities/archivo-caracteristica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeojsonCaracteristica,ArchivoCaracteristica]), 
    CaracteristicaModule,
  ],
  providers: [GeojsonCaracteristicaService],
  controllers: [GeojsonCaracteristicaController],
  exports: [GeojsonCaracteristicaService],
  
})
export class GeojsonCaracteristicaModule {}
