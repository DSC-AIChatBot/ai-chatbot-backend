import { Injectable, HttpService,ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SimpleConsoleLogger } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose'
import { User } from './entities/auth.model';
import { LoginUserDTO } from './dto/login.dto'
import { MongoService } from '../../providers/database/mongo/mongo.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel : Model<User>,
    private readonly http: HttpService, // @InjectRepository(UserEntity) // private readonly userRepository: Repository<UserEntity>,
    private readonly mongoservice:MongoService,
  ) {}

  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }    
    if (this.mongoservice.find<User>({id : `${req.user.id}`},this.userModel)){
      return new ConflictException("");
    }
    console.log(req);
    return this.mongoservice.create<User>(req.user,this.userModel)
  }

  naverLogin(req) {
    if (!req.user) {
      return 'No user from naver';
    }
    const alreadyuser = this.mongoservice.find<User>({id : `${req.user.id}`},this.userModel)
    
    alreadyuser
      .then(data => {
        if (data.length!=0){
          console.log(data)
          return data[0];
        }
        else{
          console.log("create!!")
          return this.mongoservice.create<User>(req.user,this.userModel)
        }
      })
  }

  naverCheck(req) {
    return this.mongoservice.findAll<User>(this.userModel)
  }

  dupliCheck(user:User){
    return true;
  }
  //아래는 몽고 db 관련 메소드라 추후에 모듈화 할 것이다
  // async findOne(userFilterQuery:FilterQuery<User>):Promise<User>{
  //   return this.userModel.findOne(userFilterQuery);
  // }

  // async find(usersFilterQuery:FilterQuery<User>):Promise<User[]>{
  //   return this.userModel.find(usersFilterQuery);
  // }

  // async create(user:User): Promise<User> {
  //   const newUser = new this.userModel(user);
  //   return newUser.save()
  // }

  // async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User>{
  //   return this.userModel.findOneAndUpdate(userFilterQuery, user);
  // }

}
