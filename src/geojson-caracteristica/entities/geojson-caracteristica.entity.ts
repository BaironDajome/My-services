/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { ArchivoCaracteristica } from 'src/archivo-caracteristica/entities/archivo-caracteristica.entity';
import { Caracteristica } from '../../caracteristica/entities/caracteristica.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class GeojsonCaracteristica {
  @ApiProperty({ example: 1, description: 'ID único del GeoJSON asociado a una característica' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Caracteristica, description: 'Característica asociada' })
  @ManyToOne(() => Caracteristica, (caracteristica) => caracteristica.geojsons, { onDelete: 'CASCADE' })
  caracteristica: Caracteristica;

  @ApiProperty({ type: () => ArchivoCaracteristica, description: 'Archivo de características asociado' })
  @ManyToOne(() => ArchivoCaracteristica, (archivoCaracteristica) => archivoCaracteristica.geojsons, { onDelete: 'CASCADE' })
  archivoCaracteristica: ArchivoCaracteristica;

  @ApiProperty({ example: '2024-03-14T12:00:00.000Z', description: 'Fecha de creación del registro' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @ApiProperty({ example: { "type": "FeatureCollection", "features": [] }, description: 'Archivo GeoJSON almacenado en la base de datos' })
  @Column({ type: 'jsonb' }) 
  archivoGeojson: any;

  @ApiProperty({ example: { "type": "Point", "coordinates": [-74.0721, 4.711] }, description: 'Geometría espacial del GeoJSON' })
  @Column({ type: 'geometry', spatialFeatureType: 'Geometry', srid: 4326 }) 
  geometria: object;
}
