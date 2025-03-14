/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BahiaService } from './bahia.service';
import { CreateBahiaDto } from './dto/create-bahia.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';


@ApiTags('Bahia')
@Controller('bahia')
export class BahiaController {
  constructor(private readonly bahiaService: BahiaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva Bahía' })
  @ApiResponse({ status: 201, description: 'Bahía creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiBody({ 
    description: 'Datos necesarios para crear una Bahía',
    type: CreateBahiaDto
  })
  create(@Body() createBahiaDto: CreateBahiaDto) {
    return this.bahiaService.create(createBahiaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las Bahías' })
  @ApiResponse({ status: 200, description: 'Listado de bahías obtenido correctamente' })
  findAll() {
    return this.bahiaService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una Bahía por ID' })
  @ApiResponse({ status: 200, description: 'Bahía obtenida correctamente' })
  @ApiResponse({ status: 404, description: 'Bahía no encontrada' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la Bahía' })
  findOne(@Param('id') id: string) {
    return this.bahiaService.findOne(+id);
  }
}

