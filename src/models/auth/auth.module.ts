import { HttpModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NaverStartegy } from './passport/naver.strategy';
import { GoogleStrategy } from './passport/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/auth.model';
import { MongoModule } from '../../providers/database/mongo/mongo.module';
import { Kakaostrategy } from './passport/kakao.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [
    HttpModule,
    MongoModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'dsc-ai-chatbot',
      signOptions: { expiresIn: '30s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    NaverStartegy,
    Kakaostrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
