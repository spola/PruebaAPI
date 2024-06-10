import { Injectable } from '@nestjs/common';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proceso } from './entities/proceso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcesosService {
  constructor(
    @InjectRepository(Proceso)
    private procesoRepository: Repository<Proceso>,
  ) { }

  create(createProcesoDto: CreateProcesoDto) {
    return 'This action adds a new proceso';
  }

  async findAll(): Promise<Proceso[]> {
    return this.procesoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} proceso`;
  }

  update(id: number, updateProcesoDto: UpdateProcesoDto) {
    return `This action updates a #${id} proceso`;
  }

  remove(id: number) {
    return `This action removes a #${id} proceso`;
  }
}
