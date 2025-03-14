/* eslint-disable prettier/prettier */
import { GeojsonCaracteristica } from "src/geojson-caracteristica/entities/geojson-caracteristica.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArchivoCaracteristica {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;
    
    @OneToMany(() => GeojsonCaracteristica, (geojson) => geojson.archivoCaracteristica)
    geojsons: GeojsonCaracteristica[];
}
