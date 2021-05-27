import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleUserProfile } from '../interfaces/googleUser.interfaces';

config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private config: ConfigService) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:5000/auth/login/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { sub, name, email }: GoogleUserProfile = profile._json;

    const user = {
      id: sub,
      pw: ' ',
      email: email,
      accountType: 'GOOGLE',
      nickName: name,

      gender: ' ',
      age: '',
    };

    done(null, user);
  }
}
