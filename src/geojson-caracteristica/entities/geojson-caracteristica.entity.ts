/* eslint-disable prettier/prettier */
import { ArchivoCaracteristica } from 'src/archivo-caracteristica/entities/archivo-caracteristica.entity';
import { Caracteristica } from '../../caracteristica/entities/caracteristica.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class GeojsonCaracteristica {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Caracteristica, (caracteristica) => caracteristica.geojsons, { onDelete: 'CASCADE' })
  caracteristica: Caracteristica;

  @ManyToOne(() => ArchivoCaracteristica, (archivoCaracteristica) => archivoCaracteristica.geojsons, { onDelete: 'CASCADE' })
  archivoCaracteristica: ArchivoCaracteristica;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'jsonb' }) 
  archivoGeojson: any;

  @Column({ type: 'geometry', spatialFeatureType: 'Geometry', srid: 4326 }) 
  geometria: object;
}
