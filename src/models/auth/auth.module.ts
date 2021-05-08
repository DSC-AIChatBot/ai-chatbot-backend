import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NaverStartegy } from './passport/naver.strategy';

import { UserEntity } from './entities/user.entity';

import { GoogleStrategy } from './passport/google.strategy';
@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity]),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, NaverStartegy],
})
export class AuthModule {}
