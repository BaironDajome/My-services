import { Module } from '@nestjs/common';
import { CaracteristicaService } from './caracteristica.service';
import { CaracteristicaController } from './caracteristica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caracteristica } from './entities/caracteristica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Caracteristica])],
  providers: [CaracteristicaService],
  controllers: [CaracteristicaController],
  exports: [TypeOrmModule],
})
export class CaracteristicaModule {}
