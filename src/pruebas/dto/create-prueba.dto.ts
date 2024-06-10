import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePruebaDto {
    @IsString()
    @IsNotEmpty()
    detalle: string;

    @IsNumber()
    @IsNotEmpty()
    cantidad: number;
}
