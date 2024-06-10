import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginSuccess } from './dto/login-success.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string): Promise<LoginSuccess> {
        const user = await this.userService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const { password, ...result } = user;

        const payload = { sub: user.userId, username: user.username };


        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
