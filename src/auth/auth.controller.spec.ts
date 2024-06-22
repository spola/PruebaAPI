import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              userId: 1,
              username: 'john',
              password: 'changeme',
            })
          }
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue("el_token")
          }
        },
        AuthService,
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return correct token', async () => {
    let dto = {
      username: 'john',
      password: 'changeme',
    };

    let resp = controller.signIn(dto);
    await expect(resp).resolves.toHaveProperty('access_token', "el_token");
  });

  it('should throw UnauthorizedException', async () => {
    let dto = {
      username: 'john',
      password: 'changeme',
    };

    jest.spyOn(userService, "findOne").mockResolvedValueOnce({
      username: 'john',
      password: 'otra_password'
    });

    let resp = controller.signIn(dto);
    await expect(resp).rejects.toThrow(UnauthorizedException);
  });
});
