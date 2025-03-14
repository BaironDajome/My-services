/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArchivoCaracteristicaService } from './archivo-caracteristica.service';
import { CreateArchivoCaracteristicaDto } from './dto/create-archivo-caracteristica.dto';
import { UpdateArchivoCaracteristicaDto } from './dto/update-archivo-caracteristica.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArchivoCaracteristica } from './entities/archivo-caracteristica.entity';

@ApiTags('Archivo Caracteristica')
@Controller('archivocaracteristica')
export class ArchivoCaracteristicaController {
  constructor(private readonly archivoCaracteristicaService: ArchivoCaracteristicaService) {}
  
  
  @Post()
  @ApiOperation({ summary: 'Crear Archivo-caracteristica' })
  @ApiResponse({ status: 201, description: 'Archivo-caracteristica creado exitosamente.', type: ArchivoCaracteristica })
  create(@Body() createArchivoCaracteristicaDto: CreateArchivoCaracteristicaDto) {
    return this.archivoCaracteristicaService.create(createArchivoCaracteristicaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los Archivo-caracteristica' })
  @ApiResponse({ status: 200, description: 'Lista de bahías', type: [ArchivoCaracteristica] })
  findAll() {
    return this.archivoCaracteristicaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar una Archivo-caracteristica por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la Archivo-caracteristica', type: ArchivoCaracteristica })
  @ApiResponse({ status: 404, description: 'Archivo-caracteristica no encontrada' })
  findOne(@Param('id') id: string) {
    return this.archivoCaracteristicaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una Archivo-caracteristica' })
  @ApiResponse({ status: 200, description: 'Archivo-caracteristica actualizada correctamente.', type: ArchivoCaracteristica })
  @ApiResponse({ status: 404, description: 'Archivo-caracteristica no encontrada' })
  update(@Param('id') id: string, @Body() updateArchivoCaracteristicaDto: UpdateArchivoCaracteristicaDto) {
    return this.archivoCaracteristicaService.update(+id, updateArchivoCaracteristicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoCaracteristicaService.remove(+id);
  }
}
