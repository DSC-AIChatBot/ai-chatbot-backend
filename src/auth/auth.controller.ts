import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('login/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req: any) { }
  
    @Get('login/google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: any) {
      return this.authService.googleLogin(req)
    }
}
