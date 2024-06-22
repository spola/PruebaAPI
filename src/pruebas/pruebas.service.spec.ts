import { Test, TestingModule } from '@nestjs/testing';
import { PruebasService } from './pruebas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PruebaEntity } from './entities/prueba.entity';
import { Repository } from 'typeorm';
import { DetalleEntity } from './entities/detalle.entity';

describe('PruebasService', () => {
  let service: PruebasService;

  let pruebaRepository: Repository<PruebaEntity>;
  let detalleRepository: Repository<DetalleEntity>;

  let pruebaRepositoryToken: string | Function = getRepositoryToken(PruebaEntity);
  let detalleRepositoryToken: string | Function = getRepositoryToken(DetalleEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PruebasService,
        {
          provide: pruebaRepositoryToken,
          useClass: Repository,
          useValue: {
            save: jest.fn().mockRejectedValueOnce(null),
            findOne: jest.fn().mockRejectedValueOnce(null),
            find: jest.fn().mockRejectedValueOnce(null),
            update: jest.fn().mockRejectedValueOnce(null),
          }
        }, {
          provide: detalleRepositoryToken,
          useClass: Repository,
          useValue: {
            save: jest.fn().mockResolvedValue(null)
          }
        }

      ],
    }).compile();

    service = module.get<PruebasService>(PruebasService);
    pruebaRepository = module.get<Repository<PruebaEntity>>(pruebaRepositoryToken);
    detalleRepository = module.get<Repository<DetalleEntity>>(detalleRepositoryToken);


  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(pruebaRepository).toBeDefined();
    expect(detalleRepository).toBeDefined();
  });
});
