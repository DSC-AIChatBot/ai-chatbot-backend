import { HttpModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NaverStartegy } from './passport/naver.strategy';
// import { User } from './entities/user.entity';
import { GoogleStrategy } from './passport/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/auth.model';
import { MongoModule } from '../../providers/database/mongo/mongo.module';
import { Kakaostrategy } from './passport/kakao.strategy';

@Module({
  imports: [
    // typeorm 굳이 안써도 되지않나?
    // 그래도 쓴다면 다른 SQL DB RDB 와 섞어 쓸 때 일관성을 유지할 수 있다 정도?
    // 단점 : 지원 안되는 것들이 있다. ( SQL 기반이라  default value 설정 놉 ) 
    // TypeOrmModule.forFeature([User]),
    HttpModule,
    MongoModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, NaverStartegy, Kakaostrategy],
})
export class AuthModule { }
