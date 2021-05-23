import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /*passport test code*/
  @Get('login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {}

  @Get('login/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoLoginCallback(@Req() req) {
    return this.authService.kakaoLogin(req)
  }
}
