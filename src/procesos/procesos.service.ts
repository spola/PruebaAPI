import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createProcesoDto: CreateProcesoDto): Promise<Proceso> {

    // const { title, content, rating } = createNoteDto;
    // const note = this.notesRepository.create({
    //   title,
    //   content,
    //   rating
    // });
    // await this.notesRepository.save(note);
    // return note;

    const proceso = this.procesoRepository.create(createProcesoDto);
    await this.procesoRepository.save(proceso);

    return proceso;
  }

  async findAll(): Promise<Proceso[]> {
    return this.procesoRepository.find();
  }

  async findOne(id: number): Promise<Proceso> {
    const found = await this.procesoRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Proceso "${id}" not found`);
    }
    return found;
  }

  update(id: number, updateProcesoDto: UpdateProcesoDto) {
    return `This action updates a #${id} proceso`;
  }

  remove(id: number) {
    return `This action removes a #${id} proceso`;
  }
}
