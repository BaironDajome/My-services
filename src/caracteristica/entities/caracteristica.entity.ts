/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Bahia } from '../../bahia/entities/bahia.entity';
import { GeojsonCaracteristica } from '../../geojson-caracteristica/entities/geojson-caracteristica.entity';

@Entity()
export class Caracteristica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ManyToOne(() => Bahia, (bahia) => bahia.caracteristicas, { onDelete: 'CASCADE' })
  bahia: Bahia;

  @OneToMany(() => GeojsonCaracteristica, (geojson) => geojson.caracteristica)
  geojsons: GeojsonCaracteristica[];
}
