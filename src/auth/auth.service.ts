import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    naverLogin(req){
        if (!req.user){
            return 'No user from naver';
        }
        return {
            message : 'SUCCESS LOGIN!!!! User information from naver',
            user: req.user,
        }
    }
}
