import { Test, TestingModule } from '@nestjs/testing';
import { ProcesosService } from './procesos.service';
import { Repository } from 'typeorm';
import { Proceso } from './entities/proceso.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ProcesosService', () => {
  let service: ProcesosService;
  let repository: Repository<Proceso>;

  //Este hace la magia para los repositorios genéricos
  let procesoRepositoryToken: string | Function = getRepositoryToken(Proceso);


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcesosService,
        {
          provide: procesoRepositoryToken,
          useClass: Repository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(new Proceso())
          }
        }
      ],
    }).compile();

    service = module.get<ProcesosService>(ProcesosService);
    repository = module.get<Repository<Proceso>>(procesoRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("when find one proceso", () => {
    it("should find it", async () => {
      let proceso = new Proceso();
      proceso.id = 1;
      jest.spyOn(repository, "findOne").mockResolvedValueOnce(proceso);

      expect(service.findOne(1)).resolves.toHaveProperty("id", 1);
    });

    it("should throw not found", async () => {
      jest.spyOn(repository, "findOne").mockResolvedValueOnce(null);

      expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
