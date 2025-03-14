/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBahiaDto } from './dto/create-bahia.dto';
import { Bahia } from './entities/bahia.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BahiaService {
  constructor(
    @InjectRepository(Bahia)
    private readonly bahiaRepository: Repository<Bahia>,
  ){}

  async create(createBahiaDto: CreateBahiaDto): Promise<Bahia> {
    const bahia = this.bahiaRepository.create(createBahiaDto);
    return this.bahiaRepository.save(bahia);
  }

  async findOne(id: number): Promise<Bahia> {
    const bahia = await this.bahiaRepository.findOne({ where: { id } });
    if (!bahia) {
      throw new NotFoundException(`Bahia con ID ${id} no encontrada`);
    }
    return bahia;
  }

  async findAll(): Promise<Bahia[]> {
    return this.bahiaRepository.find();
  }
}