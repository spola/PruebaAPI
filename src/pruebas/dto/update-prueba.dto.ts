import { PartialType } from '@nestjs/swagger';
import { CreatePruebaDto } from './create-prueba.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePruebaDto extends PartialType(CreatePruebaDto) {
    
    @IsNumber()
    @IsNotEmpty()
    cantidad: number;
}
