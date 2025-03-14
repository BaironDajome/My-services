/* eslint-disable prettier/prettier */
<<<<<<< HEAD
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CaracteristicaService } from './caracteristica.service';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
// import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';

=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaracteristicaService } from './caracteristica.service';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';
import { Caracteristica } from './entities/caracteristica.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
>>>>>>> feacture/documentacion

@ApiTags('Caracteristica')
@Controller('caracteristica')
export class CaracteristicaController {
  constructor(private readonly caracteristicaService: CaracteristicaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una característica' })
  @ApiResponse({ status: 201, description: 'Característica creada.', type: Caracteristica })
  create(@Body() createCaracteristicaDto: CreateCaracteristicaDto) {
    return this.caracteristicaService.create(createCaracteristicaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las características' })
  @ApiResponse({ status: 200, description: 'Lista de características', type: [Caracteristica] })
  findAll() {
    return this.caracteristicaService.findAll();
  }

  @Get(':id')
<<<<<<< HEAD
  findOne(@Param('id') id: number) {
    return this.caracteristicaService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCaracteristicaDto: UpdateCaracteristicaDto) {
  //   return this.caracteristicaService.update(+id, updateCaracteristicaDto);
  // }
=======
  @ApiOperation({ summary: 'Consultar una característica por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la característica', type: Caracteristica })
  @ApiResponse({ status: 404, description: 'Característica no encontrada' })
  findOne(@Param('id') id: string) {
    return this.caracteristicaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una característica' })
  @ApiResponse({ status: 200, description: 'Característica actualizada.', type: Caracteristica })
  @ApiResponse({ status: 404, description: 'Característica no encontrada' })
  update(@Param('id') id: string, @Body() updateCaracteristicaDto: UpdateCaracteristicaDto) {
    return this.caracteristicaService.update(+id, updateCaracteristicaDto);
  }
>>>>>>> feacture/documentacion

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.caracteristicaService.remove(id);
  }
}
