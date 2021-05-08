import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}
