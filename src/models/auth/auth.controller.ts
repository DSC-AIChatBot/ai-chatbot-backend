import { Controller, Get, Post, Req, Res, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  naverauthredirect(@Req() req, @Res() res) {
    const returndata = this.authService.naverLogin(req,res);
    return returndata;
  }

  //db에 잘들어갔는지 check하는 라우터 : DB 전체 조회
  // @Get('login/naver/check')
  // navercheck(@Req() req) {
  //   return this.authService.naverCheck(req);
  // }

  // 토큰 validation check하는 라우터

  @Post('login/naver/token')
  @UseGuards(AuthGuard('jwt'))
  navertokenvalid(@Req() req){
    return req.user;
  }
  

}
