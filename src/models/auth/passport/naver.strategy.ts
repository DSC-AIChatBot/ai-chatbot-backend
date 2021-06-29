import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyFunction } from 'passport-naver';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common'
config();

@Injectable()
export class NaverStartegy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: 'DUpvovHW0eqDV1Up4_mN',
      clientSecret: 'gALwr3pRC0',
      callbackURL: 'http://127.0.0.1:5000/auth/login/naver/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const _profile = profile._json;
    console.log(_profile);
    const user = {
      id: _profile.id,
      pw: ' ',
      // email관련해 네아로 api 요청받을때 체크하지 않아서
      // 추후에 체크했는데 아직 리프레시 토큰이 살아서
      // 계속 로그인 이후 정보를 제대로 받지 못함
      // 그래서 우선 주석 처리함
      email: _profile.email,
      // email: 'jawoon@dsc.com',
      age: _profile.age,
      accountType: 'Naver',
      nickName: ' ',
      gender: ' ',
    };

    done(null, user);
  }
}
