/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Caracteristica } from 'src/caracteristica/entities/caracteristica.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Bahia {
  @ApiProperty({ example: 1, description: 'ID único de la bahía' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Bahía de Tumaco', description: 'Nombre de la bahía' })
  @Column({ length: 100 })
  nombre: string;

  @ApiProperty({ type: () => [Caracteristica], description: 'Lista de características de la bahía' })
  @OneToMany(() => Caracteristica, (caracteristica) => caracteristica.bahia)
  caracteristicas: Caracteristica[];
}
