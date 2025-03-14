import { Injectable } from '@nestjs/common';
import { CreateArchivoCaracteristicaDto } from './dto/create-archivo-caracteristica.dto';
import { UpdateArchivoCaracteristicaDto } from './dto/update-archivo-caracteristica.dto';

@Injectable()
export class ArchivoCaracteristicaService {
  create(createArchivoCaracteristicaDto: CreateArchivoCaracteristicaDto) {
    return 'This action adds a new archivoCaracteristica';
  }

  findAll() {
    return `This action returns all archivoCaracteristica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} archivoCaracteristica`;
  }

  update(id: number, updateArchivoCaracteristicaDto: UpdateArchivoCaracteristicaDto) {
    return `This action updates a #${id} archivoCaracteristica`;
  }

  remove(id: number) {
    return `This action removes a #${id} archivoCaracteristica`;
  }
}
