import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PruebasService } from './pruebas.service';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { DetalleEntity } from './entities/detalle.entity';

@ApiTags("pruebas")
@Controller('pruebas')
export class PruebasController {
  constructor(private readonly pruebasService: PruebasService) { }

  @Post()
  create(@Body() createPruebaDto: CreatePruebaDto) {
    return this.pruebasService.create(createPruebaDto);
  }

  @Post(":id/detalles")
  async createDetalle(@Param('id') id: number, @Body() createDetalleDto: CreateDetalleDto) : Promise<DetalleEntity>{
    return this.pruebasService.createDetalle(id, createDetalleDto);
  }

  @Get()
  findAll() {
    return this.pruebasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pruebasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePruebaDto: UpdatePruebaDto) {
    return this.pruebasService.update(+id, updatePruebaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pruebasService.remove(+id);
  }
}
