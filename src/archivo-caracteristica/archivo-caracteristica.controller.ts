import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArchivoCaracteristicaService } from './archivo-caracteristica.service';
import { CreateArchivoCaracteristicaDto } from './dto/create-archivo-caracteristica.dto';
import { UpdateArchivoCaracteristicaDto } from './dto/update-archivo-caracteristica.dto';

@Controller('archivo-caracteristica')
export class ArchivoCaracteristicaController {
  constructor(private readonly archivoCaracteristicaService: ArchivoCaracteristicaService) {}

  @Post()
  create(@Body() createArchivoCaracteristicaDto: CreateArchivoCaracteristicaDto) {
    return this.archivoCaracteristicaService.create(createArchivoCaracteristicaDto);
  }

  @Get()
  findAll() {
    return this.archivoCaracteristicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archivoCaracteristicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArchivoCaracteristicaDto: UpdateArchivoCaracteristicaDto) {
    return this.archivoCaracteristicaService.update(+id, updateArchivoCaracteristicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoCaracteristicaService.remove(+id);
  }
}
