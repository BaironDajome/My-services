/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeojsonCaracteristicaService } from './geojson-caracteristica.service';
import { extname } from 'path';
import { diskStorage } from 'multer'; 

@Controller('geojsoncaracteristica')
export class GeojsonCaracteristicaController {
  constructor(private readonly geojsonService: GeojsonCaracteristicaService) {}

  @Post('upload')
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
  async obtenerTodas() {
    return this.geojsonService.obtenerTodas();
  }

  @Get(':caracteristicaId')
  async obtenerPorId(@Param('caracteristicaId') caracteristicaId: number) {
    return this.geojsonService.obtenerPorCaracteristicaId(caracteristicaId);
  }

  @Post('filtrar')
  async filtrarPorFecha(
    @Body() filtro: { inicio: string; fin: string; caracteristicaId: number }
  ) {
    return this.geojsonService.filtrarDatosPorFecha(filtro.inicio, filtro.fin, filtro.caracteristicaId);
  }

  // @Get('filtrar')
  // async filtrarPorFecha(@Query('inicio') inicio: string, @Query('fin') fin: string) {
  //   return this.geojsonService.filtrarPorFecha(inicio, fin);
  // }

}
