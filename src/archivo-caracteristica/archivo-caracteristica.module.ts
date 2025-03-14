import { Module } from '@nestjs/common';
import { ArchivoCaracteristicaService } from './archivo-caracteristica.service';
import { ArchivoCaracteristicaController } from './archivo-caracteristica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivoCaracteristica } from './entities/archivo-caracteristica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArchivoCaracteristica])],
  controllers: [ArchivoCaracteristicaController],
  providers: [ArchivoCaracteristicaService],
  exports: [TypeOrmModule],
})
export class ArchivoCaracteristicaModule {}
