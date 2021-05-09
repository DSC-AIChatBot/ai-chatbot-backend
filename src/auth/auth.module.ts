import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Kakaostrategy } from './passport/kakao.strategy';
//import { UserEntity } from './entities/user.entity';

@Module({
  //imports : [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, Kakaostrategy],
})
export class AuthModule {}
