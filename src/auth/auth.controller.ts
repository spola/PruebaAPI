import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginSuccess } from './dto/login-success.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async signIn(@Body() signInDto: LoginDto): Promise<LoginSuccess> {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
