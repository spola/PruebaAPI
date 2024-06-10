import { Module } from '@nestjs/common';
import { ProcesosService } from './procesos.service';
import { ProcesosController } from './procesos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proceso } from './entities/proceso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proceso])],
  controllers: [ProcesosController],
  providers: [ProcesosService],
})
export class ProcesosModule {}
