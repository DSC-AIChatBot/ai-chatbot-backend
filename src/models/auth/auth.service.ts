import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose'
import { User } from 'src/providers/database/mongo/auth.model';
import { LoginUserDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) { }

  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }
    console.log(req);
    return this.create(req.user)
  }

  naverLogin(req) {
    if (!req.user) {
      return 'No user from naver';
    }
    console.log(req);
    return this.create(req.user)
  }

  //아래는 몽고 db 관련 메소드라 추후에 모듈화 할 것이다
  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery);
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save()
  }

  async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user);
  }

}
