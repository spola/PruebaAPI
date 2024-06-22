import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PruebaEntity } from './entities/prueba.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { DetalleEntity } from './entities/detalle.entity';
import { CreateDetalleDto } from 'src/procesos/dto/create-detalle.dto';

@Injectable()
export class PruebasService {
  constructor(
    @InjectRepository(PruebaEntity)
    private _pruebaRepository: Repository<PruebaEntity>,

    @InjectRepository(DetalleEntity)
    private detalleRepository: Repository<DetalleEntity>,
  ) { }

  async create(createPostDto: CreatePruebaDto): Promise<PruebaEntity> {
    const newPost = await this._pruebaRepository.save({
      detalle: createPostDto.detalle,
      cantidad: createPostDto.cantidad,
    });
    return newPost;
  }

  async findAll(): Promise<PruebaEntity[]> {
    return await this._pruebaRepository.find({
      relations:["detalles"],
      where: {
        deletedAt: IsNull()
      }
    });
  }

  async findOne(id: number): Promise<PruebaEntity> {
    const postExist = await this._pruebaRepository.findOne({
      relations:["detalles"],
      where: {
        id: id,
        deletedAt: IsNull()
      },
    });
    if (!postExist) throw new NotFoundException('Esta prueba no existe');
    return postExist;
  }

  async update(id: number, updatePruebaDto: Partial<UpdatePruebaDto>) {
    const pruebaExist = await this._pruebaRepository.findOne({
      where: { id: id, deletedAt: IsNull() },
    });
    if (!pruebaExist) throw new NotFoundException('Esta prueba no existe');
    const updatedPrueba = Object.assign(pruebaExist, updatePruebaDto);

    return await this._pruebaRepository.save(updatedPrueba);
  }

  async remove(id: number): Promise<void> {
    const postExist = await this._pruebaRepository.findOne({
      where: { id: id },
    });
    if (!postExist) throw new NotFoundException('Esta prueba no existe');

    await this._pruebaRepository.update(id, { deletedAt: new Date() });
  }

  async createDetalle(id: number, createDetalleDto: CreateDetalleDto): Promise<DetalleEntity> {
    let prueba = await this.findOne(id);

    return await this.detalleRepository.save({
      descripcion: createDetalleDto.descripcion,
      prueba:prueba
    });
  }
}
