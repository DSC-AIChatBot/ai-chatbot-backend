import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NaverStartegy } from './passport/naver.strategy';
import { UserEntity } from './entities/user.entity';
import { GoogleStrategy } from './passport/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/providers/database/mongo/auth.model';

@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity]),
    HttpModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, NaverStartegy],
})
export class AuthModule {}
