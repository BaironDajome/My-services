/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { GeojsonCaracteristica } from 'src/geojson-caracteristica/entities/geojson-caracteristica.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArchivoCaracteristica {
    @ApiProperty({ example: 1, description: 'ID único del archivo de características' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Archivo Ejemplo', description: 'Nombre del archivo' })
    @Column({ length: 100 })
    name: string;

    @ApiProperty({ example: '2024-03-14T12:00:00.000Z', description: 'Fecha de creación del archivo' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

    @ApiProperty({ type: () => [GeojsonCaracteristica], description: 'Lista de características geojson asociadas' })
    @OneToMany(() => GeojsonCaracteristica, (geojson) => geojson.archivoCaracteristica)
    geojsons: GeojsonCaracteristica[];
}
