import { Module } from '@nestjs/common';
import { BahiaService } from './bahia.service';
import { BahiaController } from './bahia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bahia } from './entities/bahia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bahia])],
  controllers: [BahiaController],
  providers: [BahiaService],
  exports: [BahiaService],
})
export class BahiaModule {}
