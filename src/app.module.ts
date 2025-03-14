/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BahiaModule } from './bahia/bahia.module';
import { CaracteristicaModule } from './caracteristica/caracteristica.module';
import { GeojsonCaracteristicaModule } from './geojson-caracteristica/geojson-caracteristica.module';
import { ArchivoCaracteristicaModule } from './archivo-caracteristica/archivo-caracteristica.module';

@Module({
  imports: [
    DatabaseModule,
    BahiaModule,
    CaracteristicaModule,
    GeojsonCaracteristicaModule,
    ArchivoCaracteristicaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
