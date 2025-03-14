/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Bahia } from '../../bahia/entities/bahia.entity';
import { GeojsonCaracteristica } from '../../geojson-caracteristica/entities/geojson-caracteristica.entity';

@Entity()
export class Caracteristica {
  @ApiProperty({ example: 1, description: 'ID único de la característica' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Corriente', description: 'Nombre de la característica' })
  @Column({ length: 100 })
  nombre: string;

  @ApiProperty({ example: 'Característica que representa las corrientes en la bahía', description: 'Descripción de la característica', nullable: true })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ApiProperty({ type: () => Bahia, description: 'Bahía a la que pertenece la característica' })
  @ManyToOne(() => Bahia, (bahia) => bahia.caracteristicas, { onDelete: 'CASCADE' })
  bahia: Bahia;

  @ApiProperty({ type: () => [GeojsonCaracteristica], description: 'Lista de elementos GeoJSON asociados' })
  @OneToMany(() => GeojsonCaracteristica, (geojson) => geojson.caracteristica)
  geojsons: GeojsonCaracteristica[];
}
