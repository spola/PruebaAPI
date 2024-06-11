import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        example: 'john',
        required: true,
        description: "Nombre de usuario"
    })
    @IsString()
    username: string;

    @ApiProperty({
        example: 'changeme',
        required: true,
        description: "Contraseña"
    })
    @IsString()
    password: string;
}