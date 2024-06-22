import { Test, TestingModule } from '@nestjs/testing';
import { PruebasController } from './pruebas.controller';
import { PruebasService } from './pruebas.service';
import { PruebaEntity } from './entities/prueba.entity';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { CreatePruebaDto } from './dto/create-prueba.dto';

function initData() {

  let createDTO: PruebaEntity = new PruebaEntity();
  createDTO.id = 10000;

  return {
    createDTO: createDTO
  };
}

describe('PruebasController', () => {

  let data = initData();

  let controller: PruebasController;
  let service: PruebasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PruebasController],
      providers: [{
        provide: PruebasService,
        useValue: {
          create: jest.fn().mockResolvedValue(data.createDTO)
        }
      }],
    }).compile();

    controller = module.get<PruebasController>(PruebasController);
    service = module.get<PruebasService>(PruebasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be created', async () => {

    let dto = {
    } as CreatePruebaDto;

    let resp = controller.create(dto);
    await expect(resp).resolves.toBeInstanceOf(PruebaEntity);
  });
});
