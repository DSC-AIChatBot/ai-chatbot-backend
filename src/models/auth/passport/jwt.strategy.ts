import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      ignoreExpiration: false,
      secretOrKey: 'dsc-ai-chatbot',
    });
  }

  async validate(payload: any) {
    console.log('In JWT Strategy', payload);
    return payload;
  }
}
