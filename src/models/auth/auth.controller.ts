import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guards/jwtGuard.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {
    /* */
  }

  @Get('login/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: any) {
    return this.authService.googleLogin(req);
  }

  @Get('login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {
    /* */
  }

  @Get('login/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoLoginCallback(@Req() req) {
    return this.authService.kakaoLogin(req);
  }

  @Get('login/naver')
  @UseGuards(AuthGuard('naver'))
  async naverAuth(@Req() req) {
    /* */
  }

  @Get('login/naver/callback')
  @UseGuards(AuthGuard('naver'))
  naverauthredirect(@Req() req) {
    return this.authService.naverLogin(req);
  }

  @Get('login/naver/check')
  navercheck(@Req() req) {
    return this.authService.naverCheck(req);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req) {
    console.log('In Auth Controller ', req.user);
    return null;
  }

  @Get('test-token')
  async testToken(@Req() req) {
    return this.authService.makeTestToken();
  }
}
