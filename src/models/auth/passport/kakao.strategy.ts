import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';

config();

@Injectable()
export class Kakaostrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: '6409680cc32ae3852f2c8d7f9a8855ef',
      clientSecret: '6wu3bl1iRMh9eoUveV0A6yjEtz6ncrBt',
      callbackURL: 'http://localhost:5000/auth/login/kakao/callback',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    console.log(profile);
    const _profile = profile._json;
    const user = { id: _profile.id };

    done(null, user);
  }
}
