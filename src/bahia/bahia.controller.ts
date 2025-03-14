import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BahiaService } from './bahia.service';
import { CreateBahiaDto } from './dto/create-bahia.dto';
import { UpdateBahiaDto } from './dto/update-bahia.dto';

@Controller('bahia')
export class BahiaController {
  constructor(private readonly bahiaService: BahiaService) {}

  @Post()
  create(@Body() createBahiaDto: CreateBahiaDto) {
    return this.bahiaService.create(createBahiaDto);
  }

  @Get()
  findAll() {
    return this.bahiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bahiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBahiaDto: UpdateBahiaDto) {
    return this.bahiaService.update(+id, updateBahiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bahiaService.remove(+id);
  }
}
