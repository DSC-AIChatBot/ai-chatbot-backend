import {
  Injectable,
  HttpService,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SimpleConsoleLogger } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { User } from './entities/auth.model';
import { LoginUserDTO } from './dto/login.dto';
import { MongoService } from '../../providers/database/mongo/mongo.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly http: HttpService, // @InjectRepository(UserEntity) // private readonly userRepository: Repository<UserEntity>,
    private readonly mongoservice: MongoService,
    private readonly jwtService: JwtService,
  ) {}

  googleLogin(req: any) {
    if (!req.user) {
      return new NotFoundException('No user from google');
    }
    if (
      this.mongoservice.find<User>({ id: `${req.user.id}` }, this.userModel)
    ) {
      return new ConflictException('');
    }
    console.log(req);
    return this.mongoservice.create<User>(req.user, this.userModel);
  }

  naverLogin(req): Promise<User> | NotFoundException {
    if (!req.user) {
      return new NotFoundException('No user from naver');
    }
    const alreadyuser = this.mongoservice.findOne<User>(
      { id: `${req.user.id}` },
      this.userModel,
    );

    return alreadyuser.then((data) => {
      if (data) {
        console.log(data);
        return data;
      } else {
        console.log('create!!');
        return this.mongoservice.create<User>(req.user, this.userModel);
      }
    });
  }

  kakaoLogin(req) {
    if (!req.user) {
      return new NotFoundException('No user from kakao');
    }
    return {
      message: 'Success, User info from kakao',
      user: req.user,
    };
  }

  naverCheck(req) {
    return this.mongoservice.findAll<User>(this.userModel);
  }

  dupliCheck(user: User) {
    return true;
  }

  async getProfile(req: any) {
    console.log('In Auth getProfile', req);
    return null;
  }

  async makeTestToken() {
    return this.jwtService.sign({
      id: 'testToken',
    });
  }
}
