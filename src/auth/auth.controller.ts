import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginSuccess } from './dto/login-success.dto';
import { AuthGuard } from './auth.guard';

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

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
