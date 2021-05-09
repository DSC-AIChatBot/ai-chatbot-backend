import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
@Injectable()
export class AuthService {
  // constructor(
  //   //private readonly http: HttpService,
  //   @InjectRepository(UserEntity)
  //   private readonly userRepository: Repository<UserEntity>,
  // ){}

  kakaoLogin(req){
    if(!req.user){
      return 'no user from kakao';
    }
    return {
      message : "Success, User info from kakao",
      user : req.user,
  }
  }
}