/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {   Between, Repository } from 'typeorm';
import * as fs from 'fs';
import { Caracteristica } from 'src/caracteristica/entities/caracteristica.entity';
import { GeojsonCaracteristica } from './entities/geojson-caracteristica.entity';
import { ArchivoCaracteristica } from 'src/archivo-caracteristica/entities/archivo-caracteristica.entity';

@Injectable()
export class GeojsonCaracteristicaService {
  constructor(
    @InjectRepository(Caracteristica)
    private readonly caracteristicaRepo: Repository<Caracteristica>,
    
    @InjectRepository(GeojsonCaracteristica)
    private readonly geojsonRepo: Repository<GeojsonCaracteristica>,

    @InjectRepository(ArchivoCaracteristica)
    private readonly archivoCaracteristicaRepo: Repository<ArchivoCaracteristica>,
  ) {}

  async guardarDesdeArchivo(rutaArchivo: string, nameArchivo: string, caracteristicaId: number): Promise<string> {
    try {
      // Leer archivo GeoJSON
      const contenido = fs.readFileSync(rutaArchivo, 'utf8');
      const geojson = JSON.parse(contenido);

      // Validar que sea un FeatureCollection
      if (geojson.type !== 'FeatureCollection' || !geojson.features) {
        throw new HttpException('El archivo GeoJSON no contiene geometría válida', HttpStatus.BAD_REQUEST);
      }

      // Buscar la característica relacionada
      const caracteristica = await this.caracteristicaRepo.findOne({ where: { id: caracteristicaId } });
      if (!caracteristica) {
        throw new HttpException('La característica asociada no existe', HttpStatus.NOT_FOUND);
      }

      // Verificar si el archivo ya fue guardado
      const archivoCaracteristicaExistente = await this.archivoCaracteristicaRepo.findOne({ where: { name: nameArchivo } });
      if (archivoCaracteristicaExistente) {
        throw new HttpException(`Los datos del archivo ya fueron guardados. Fecha: ${archivoCaracteristicaExistente.fecha}`, HttpStatus.CONFLICT);
      }

      // Crear y guardar el nuevo registro de ArchivoCaracteristica
      const nuevoArchivoCaracteristica = this.archivoCaracteristicaRepo.create({ name: nameArchivo });
      await this.archivoCaracteristicaRepo.save(nuevoArchivoCaracteristica);

      // Insertar cada Feature en la base de datos
      for (const feature of geojson.features) {
        if (!feature.geometry) {
          console.warn('Feature sin geometría, se omite:', feature);
          continue;
        }

        // Crear entidad sin la geometría
        const nuevaCaracteristica = this.geojsonRepo.create({
          caracteristica,
          archivoCaracteristica: nuevoArchivoCaracteristica, // Asocia el archivo
          archivoGeojson: feature,
        });

        // Guardar la entidad con la geometría procesada
        await this.geojsonRepo.save({
          ...nuevaCaracteristica,
          geometria: () => `ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}')`,
        });
      }

      return 'Archivo GeoJSON guardado correctamente';
    } catch (error) {
      console.error('Error al guardar el archivo GeoJSON:', error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async obtenerTodas(): Promise<any> {
    const datos = await this.geojsonRepo.find({
      relations: ['caracteristica', 'archivoCaracteristica'],
    });
    return this.transformarAGeoJSON(datos);
  }

  private transformarAGeoJSON(datos: GeojsonCaracteristica[]): any { 
    return {
      type: 'FeatureCollection',
      caracteristica:datos[0].caracteristica.nombre,
      features: datos.map((item) => ({
        type: 'Feature',
        geometry: item.geometria, 
        properties: {
          timestamp: item.fecha.toISOString(), // Formato estándar ISO 8601
          magnitude: item.archivoGeojson.magnitude || null, // Si hay un valor en el JSON
        },
      })),
    };
  }

  async obtenerPorCaracteristicaId(caracteristicaId: number): Promise<any> {
    const datos = await this.geojsonRepo.find({
      where: { caracteristica: { id: caracteristicaId } },
      relations: ['caracteristica', 'archivoCaracteristica'],
    });
    return datos.length > 0 ? this.transformarAGeoJSON(datos) : { message: 'No se encontraron datos' };
  }
  
  async filtrarDatosPorFecha(fechaInicio: string, fechaFin: string, caracteristicaId: number): Promise<any> {  
    try {
      const datos = await this.geojsonRepo.find({
        where: {
          caracteristica: { id: caracteristicaId }, 
          fecha: Between(new Date(fechaInicio), new Date(fechaFin)),
        },
        relations: ['caracteristica', 'archivoCaracteristica'],
      });
  
      return datos.length > 0 ? this.transformarAGeoJSON(datos) : { message: 'No se encontraron datos' };
    } catch (error) {
      throw new BadRequestException(`Error en la consulta: ${error.message}`);
    }
  }
}  


