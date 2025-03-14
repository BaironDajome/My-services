/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CaracteristicaService } from './caracteristica.service';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
// import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';


@Controller('caracteristica')
export class CaracteristicaController {
  constructor(private readonly caracteristicaService: CaracteristicaService) {}

  @Post()
  create(@Body() createCaracteristicaDto: CreateCaracteristicaDto) {
    return this.caracteristicaService.create(createCaracteristicaDto);
  }

  @Get()
  findAll() {
    return this.caracteristicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.caracteristicaService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCaracteristicaDto: UpdateCaracteristicaDto) {
  //   return this.caracteristicaService.update(+id, updateCaracteristicaDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.caracteristicaService.remove(id);
  }
}
