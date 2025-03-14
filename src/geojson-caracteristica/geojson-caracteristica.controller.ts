/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeojsonCaracteristicaService } from './geojson-caracteristica.service';
import { extname } from 'path';
import { diskStorage } from 'multer'; 
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Geojsoncaracteristica')
@Controller('geojsoncaracteristica')
export class GeojsonCaracteristicaController {
  constructor(private readonly geojsonService: GeojsonCaracteristicaService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Subir un archivo GeoJSON' })
  @ApiResponse({ status: 201, description: 'Archivo GeoJSON subido exitosamente' })
  @ApiResponse({ status: 400, description: 'Formato de archivo no permitido' })
  @ApiBody({ description: 'Carga un archivo GeoJSON junto con el ID de la característica', schema: {
      type: 'object',
      properties: {
        caracteristicaId: { type: 'number', example: 1 },
        nameArchivo: { type: 'string', example: 'Mapa1' },
        file: { type: 'string', format: 'binary' }
      }
    }
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExt = extname(file.originalname);
          callback(null, `geojson_${Date.now()}${fileExt}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(geojson)$/)) {
          return callback(new Error('Solo archivos .geojson son permitidos'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('caracteristicaId') caracteristicaId: number,
    @Body('nameArchivo') nameArchivo: string
  ) {
    return this.geojsonService.guardarDesdeArchivo(file.path,nameArchivo,caracteristicaId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las características GeoJSON' })
  @ApiResponse({ status: 200, description: 'Lista de características obtenida correctamente' })
  async obtenerTodas() {
    return this.geojsonService.obtenerTodas();
  }

  @Get(':caracteristicaId')
  @ApiOperation({ summary: 'Obtener GeoJSON por ID de característica' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Característica no encontrada' })
  async obtenerPorId(@Param('caracteristicaId') caracteristicaId: number) {
    return this.geojsonService.obtenerPorCaracteristicaId(caracteristicaId);
  }

  @Post('filtrar')
  @ApiOperation({ summary: 'Filtrar GeoJSON por fecha' })
  @ApiResponse({ status: 200, description: 'Datos filtrados exitosamente' })
  @ApiResponse({ status: 400, description: 'Fechas inválidas' })
  @ApiBody({
    description: 'Rango de fechas y ID de la característica',
    schema: {
      type: 'object',
      properties: {
        inicio: { type: 'string', format: 'date', example: '2024-01-01' },
        fin: { type: 'string', format: 'date', example: '2024-12-31' },
        caracteristicaId: { type: 'number', example: 1 }
      }
    }
  })
  async filtrarPorFecha(
    @Body() filtro: { inicio: string; fin: string; caracteristicaId: number }
  ) {
    return this.geojsonService.filtrarDatosPorFecha(filtro.inicio, filtro.fin, filtro.caracteristicaId);
  }
}
