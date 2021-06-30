import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwtGuard.guard';
import { AuthService } from './auth.service';
import { SocialLoginReq } from './dto/socialLoginReq.dto';
import { User } from './entities/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {
    /* */
  }

  @Get('login/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginUser: SocialLoginReq = {
      user: req.user as User
    };
    await this.authService.signSocialJwtToken(req, res);
    await this.authService.googleLogin(loginUser);
    res.redirect('http://localhost:3000');
  }

  @Get('login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {
    /* */
  }

  @Get('login/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoLoginCallback(@Res() res: Response) {
    res.redirect('http://localhost:3000');
  }

  @Get('login/naver')
  @UseGuards(AuthGuard('naver'))
  async naverAuth(@Req() req) {
    /* */
  }

  @Get('login/naver/callback')
  @UseGuards(AuthGuard('naver'))
  naverauthredirect(@Res() res) {
    res.redirect('http://localhost:3000');
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: Request) {
    return this.authService.getProfile(req);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    return this.authService.getProfile(req);
  }
}
