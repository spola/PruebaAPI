import { Module } from '@nestjs/common';
import { PruebasService } from './pruebas.service';
import { PruebasController } from './pruebas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PruebaEntity } from './entities/prueba.entity';
import { DetalleEntity } from './entities/detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PruebaEntity, DetalleEntity])],
  controllers: [PruebasController],
  providers: [PruebasService],
})
export class PruebasModule {}
