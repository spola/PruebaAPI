import { Test, TestingModule } from '@nestjs/testing';
import { ProcesosController } from './procesos.controller';
import { ProcesosService } from './procesos.service';
import { Proceso } from './entities/proceso.entity';
import { CreateProcesoDto } from './dto/create-proceso.dto';

describe('ProcesosController', () => {
  let controller: ProcesosController;
  let service: ProcesosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcesosController],
      providers: [{
        provide: ProcesosService,
        useValue: {
          create: jest.fn().mockResolvedValue(new Proceso())
        }
      }],
    }).compile();

    controller = module.get<ProcesosController>(ProcesosController);
    service = module.get<ProcesosService>(ProcesosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be created', async () => {

    let dto = {
    } as CreateProcesoDto;

    let resp = controller.create(dto);
    await expect(resp).resolves.toBeInstanceOf(Proceso);
  });
});
