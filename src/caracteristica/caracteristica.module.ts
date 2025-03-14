/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CaracteristicaService } from './caracteristica.service';
import { CaracteristicaController } from './caracteristica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caracteristica } from './entities/caracteristica.entity';
import { BahiaModule } from 'src/bahia/bahia.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Caracteristica]), 
    BahiaModule 
  ],
  providers: [CaracteristicaService],
  controllers: [CaracteristicaController],
  exports: [TypeOrmModule],
})
export class CaracteristicaModule {}
