import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginSuccess } from './dto/login-success.dto';
import { jwtConstants } from './constants';

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

        let access_token = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret
        });

        return {
            access_token: access_token,
        };
    }
}
