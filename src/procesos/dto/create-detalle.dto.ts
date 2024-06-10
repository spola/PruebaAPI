import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsString } from "class-validator";

export class CreateDetalleDto {
    @ApiProperty({
        example: 'Se realizó una prueba completa de punta a punta',
        required: true,
        description: "Descripción de los pasos de las pruebas"
    })
    @IsString()
    readonly descripcion: string;
}