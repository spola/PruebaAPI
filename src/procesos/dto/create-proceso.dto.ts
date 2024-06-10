import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsString } from "class-validator";

export class CreateProcesoDto {
    @ApiProperty({
        example: '136485',
        required: true,
        description: "Referencia al ticket donde se asocia el proceso"
    })
    @IsString()
    readonly referencia: string;

    @ApiProperty({
        example: '35',
        required: true,
        description: "Referencia al centro de costo guardado"
    })
    @IsInt()
    readonly centroCostoId: number;

    @ApiProperty({
        example: '20204-06-10T14:50:00',
        required: true,
        description: "Fecha de creación del proceso"
    })
    @IsDate()
    readonly fechaCreacion!: Date;
}
