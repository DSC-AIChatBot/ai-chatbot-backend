import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NaverStartegy } from './passport/naver.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, NaverStartegy],
})
export class AuthModule {}
