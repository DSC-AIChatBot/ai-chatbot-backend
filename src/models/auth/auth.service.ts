import {
  Injectable,
  HttpService,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SimpleConsoleLogger } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/auth.model';
import { MongoService } from '../../providers/database/mongo/mongo.service';
import { JwtService } from '@nestjs/jwt';
import { SocialLoginReq } from './dto/socialLoginReq.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly http: HttpService, // @InjectRepository(UserEntity) // private readonly userRepository: Repository<UserEntity>,
    private readonly mongoservice: MongoService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 유저 정보 존재 여부 확인 메소드
   * @param id 몽고 DB PK
   * @param accountType 소셜 로그인 type
   * @returns User Model 값
   */
  private async dupleCheck(
    id: string,
    accountType: 'KAKAO' | 'GOOGLE' | 'NAVER' | 'LOCAL',
  ): Promise<User> {
    const user = this.mongoservice.findOne<User>(
      { id, accountType },
      this.userModel,
    );

    return user;
  }

  async googleLogin(req: SocialLoginReq) {
    if (!req.user) {
      return new NotFoundException('No user from google');
    }

    const dbUser = await this.dupleCheck(req.user.id, 'GOOGLE');

    if (dbUser) {
      return dbUser;
    } else {
      return this.mongoservice.create<User>(req.user, this.userModel);
    }
  }

  async naverLogin(req: SocialLoginReq): Promise<User | NotFoundException> {
    if (!req.user) {
      return new NotFoundException('No user from naver');
    }

    const dbUser = await this.dupleCheck(req.user.id, 'NAVER');

    if (dbUser) {
      return dbUser;
    } else {
      return this.mongoservice.create<User>(req.user, this.userModel);
    }
  }

  async kakaoLogin(req: SocialLoginReq) {
    if (!req.user) {
      return new NotFoundException('No user from kakao');
    }

    const dbUser = await this.dupleCheck(req.user.id, 'KAKAO');

    if (dbUser) {
      return dbUser;
    } else {
      return this.mongoservice.create<User>(req.user, this.userModel);
    }
  }

  async getProfile(req: any) {
    const { id, accountType } = req.user;

    return this.mongoservice.findOne<User>({ id, accountType }, this.userModel);
  }

  async signSocialJwtToken(req: Request, res: Response) {
    const accessToken = await this.jwtService.sign({
      ...req.user,
    });

    return res.cookie('accesstoken', accessToken);
  }
}
