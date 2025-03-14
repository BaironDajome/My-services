import { Caracteristica } from 'src/caracteristica/entities/caracteristica.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Bahia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @OneToMany(() => Caracteristica, (caracteristica) => caracteristica.bahia)
  caracteristicas: Caracteristica[];
}
