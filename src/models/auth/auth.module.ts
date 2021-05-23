import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NaverStartegy } from './passport/naver.strategy';
import { User } from './entities/auth.model';
import { GoogleStrategy } from './passport/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/auth.model';
import { MongoModule } from '../../providers/database/mongo/mongo.module'
import { MongoService } from '../../providers/database/mongo/mongo.service'

@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity]),
    HttpModule,
    MongoModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, NaverStartegy],
})
export class AuthModule {}
