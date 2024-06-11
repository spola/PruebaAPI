import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginSuccess } from './dto/login-success.dto';
import { jwtConstants } from './constants';
import { access } from 'fs';

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

console.info(jwtConstants.secret);
        let access_token = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret
        });
console.info(access_token);
let verified = this.jwtService.verify(access_token, {
    secret: jwtConstants.secret
});
console.info(verified);
let v = await this.jwtService.verifyAsync(access_token, {
    secret: jwtConstants.secret
});
console.info(v);
        return {
            access_token: access_token,
        };
    }
}
