/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Caracteristica } from './entities/caracteristica.entity';
import { Repository } from 'typeorm';
import { Bahia } from 'src/bahia/entities/bahia.entity';
// import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';

@Injectable()
export class CaracteristicaService {
  constructor(
    @InjectRepository(Caracteristica)
    private readonly caracteristicaRepository: Repository<Caracteristica>,

    @InjectRepository(Bahia)
    private readonly bahiaRepository: Repository<Bahia>,
  ) {}

  async create(createCaracteristicaDto: CreateCaracteristicaDto): Promise<Caracteristica> {
    const { bahiaId, ...restoDatos } = createCaracteristicaDto;
  
    const bahia = await this.bahiaRepository.findOne({ where: { id: bahiaId } });
    if (!bahia) {
      throw new NotFoundException(`Bahia con ID ${bahiaId} no encontrada`);
    }
  
    // Crear la característica con la relación correcta
    const caracteristica = this.caracteristicaRepository.create({
      ...restoDatos,
      bahia,
    });
  
    return this.caracteristicaRepository.save(caracteristica);
  }
  async findAll(): Promise<Caracteristica[]> {
    return this.caracteristicaRepository.find({ relations: ['bahia'] });
  }

  async findOne(id: number): Promise<Caracteristica> {
    const caracteristica = await this.caracteristicaRepository.findOne({ 
      where: { id }, 
      relations: ['bahia'] 
    });
  
    if (!caracteristica) {
      throw new NotFoundException(`Caracteristica con ID ${id} no encontrada`);
    }
  
    return caracteristica;
  }

  // async update(id: number, updateCaracteristicaDto: UpdateCaracteristicaDto) {
  //   return `This action updates a #${id} bahia`;
  // }

  async remove(id: number): Promise<void> {
    await this.caracteristicaRepository.delete(id);
  }
}
