import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BahiaService } from './bahia.service';
import { CreateBahiaDto } from './dto/create-bahia.dto';

@Controller('bahia')
export class BahiaController {
  constructor(private readonly bahiaService: BahiaService) {}

  @Post()
  create(@Body() createBahiaDto: CreateBahiaDto) {
    return this.bahiaService.create(createBahiaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bahiaService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.bahiaService.findAll();
  }
}
