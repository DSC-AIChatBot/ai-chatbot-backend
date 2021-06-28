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
    private jwtService: JwtService,
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

  naverLogin(req, res): Promise<User> | NotFoundException {
    //social 로그인이 되지 않은 경우 : 네이버에 아이디가 없을 때
    if (!req.user) {
      return new NotFoundException('No user from naver');
    }

    //위의 조건을 통과했다면 서비스를 사용할 수 있기에 
    //토큰을 발급하고 쿠키에 Token을 추가한다
    const Token = this.getToken(req.user);
    console.log(Token);
    res.cookie('Authorization',`${Token}`);

    //몽고db에 유저 정보가 있는지 조회한다 
    const alreadyuser = this.mongoservice.findOne<User>(
      { id: `${req.user.id}` },
      this.userModel,
    );

    return alreadyuser.then((data) => {
      //이미 서비스를 한 번 이용해서 DB에 정보가 있는 경우
      if (data) {
        console.log(data);
        return data;
      } 
      //처음 서비스를 사용해서 회원가입 되는 경우
      else {
        console.log('create!!');
        this.mongoservice.create<User>(req.user, this.userModel);
        return data;
        // return this.mongoservice.create<User>(req.user, this.userModel);
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

  getToken(user: User){
    const payload = { username: user.email , sub: user.id};
    return this.jwtService.sign(payload);
  }

}
