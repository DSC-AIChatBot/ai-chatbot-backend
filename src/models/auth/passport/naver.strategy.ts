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
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void
    ): Promise<any> {
        console.log(profile)
        const _profile = profile._json;
        const user = {
            id: _profile.id,
        }

        done(null, user);
    }
}

