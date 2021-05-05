import { Controller, Get, Req, UseGuards,  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Get('login/naver')
    @UseGuards(AuthGuard('naver'))
    async googleAuth(@Req() req) {}

    @Get('login/naver/callback')
    @UseGuards(AuthGuard('naver'))
    naverauthredirect(@Req() req) {
        return this.authService.naverLogin(req);
    }
}
