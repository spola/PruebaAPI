import { ValidationError, validate } from 'class-validator';
import { CreatePruebaDto } from './create-prueba.dto';
import { error } from 'console';

describe('Pruebas DTO', () => {

    describe("should CreatePruebaDto", () => {


        it("be valid", async () => {
            let dto: CreatePruebaDto;
            let errores: ValidationError[];

            dto = {
                detalle: "Este es un detalle",
                cantidad: 10
            };

            errores = await validate(dto);
            expect(errores).toHaveLength(0);
        });
        it("be invalid detalle", async () => {
            let dto: CreatePruebaDto;
            let errores: ValidationError[];

            dto = new CreatePruebaDto();
            dto.cantidad = 0;

            dto.detalle = null;
            errores = await validate(dto);
            expect(errores).toHaveLength(1);

            dto.detalle = "";
            errores = await validate(dto);
            expect(errores).toHaveLength(1);
        });
        it("be invalid cantidad", async () => {

            let dto = new CreatePruebaDto();
            let errores: ValidationError[];

            
            dto.detalle = "Un mensaje";
            errores = await validate(dto);

            expect(errores).toHaveLength(1);

            expect(errores[0].constraints).toHaveProperty("isNotEmpty")
            expect(errores[0].constraints).toHaveProperty("isNumber")

        });

    });
});