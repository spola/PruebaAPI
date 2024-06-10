import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcesosService } from './procesos.service';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Proceso } from './entities/proceso.entity';

@ApiTags("procesos")
@Controller('procesos')
export class ProcesosController {
  constructor(private readonly procesosService: ProcesosService) { }

  @Post()
  @ApiOperation({ summary: 'Crear proceso' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateProcesoDto,
    description: 'Estructura json para crear un proceso',
  })
  //@ApiResponse({status:201, type:})
  create(@Body() createProcesoDto: CreateProcesoDto) {
    return this.procesosService.create(createProcesoDto);
  }


  @Get()
  @ApiResponse({
    status: 200,
    description: "Lista de procesos",
    type: Proceso,
    isArray: true
  })
  async findAll(): Promise<Proceso[]> {
    return this.procesosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procesosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcesoDto: UpdateProcesoDto) {
    return this.procesosService.update(+id, updateProcesoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procesosService.remove(+id);
  }
}
