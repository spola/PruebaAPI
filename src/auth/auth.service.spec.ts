import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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
        JwtService
        // {
        //   provide: JwtService,
        //   useValue: {
        //     signAsync: jest.fn().mockResolvedValue("el_token")
        //   }
        // }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct token', async () => {
    let resp = service.signIn('john', 'changeme');
    await expect(resp).resolves.toHaveProperty('access_token');
  });

  it('should throw UnauthorizedException wrong password', async () => {
    jest.spyOn(userService, "findOne").mockResolvedValueOnce({
      username: 'john',
      password: 'otra_password'
    });

    let resp = service.signIn('john', 'changeme');
    await expect(resp).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException user not found', async () => {
    jest.spyOn(userService, "findOne").mockResolvedValueOnce(null);

    let resp = service.signIn('john', 'changeme');
    await expect(resp).rejects.toThrow(UnauthorizedException);
  });
});
