import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const fromAuthCookie = function () {
	return function (request) {
		let token = null;
		if (request && request.cookies ) {
			token = request.cookies['Authorization'];
		}
		return token;
	}
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly config: ConfigService
	) {
		super({
			jwtFromRequest: fromAuthCookie(),
			ignoreExpiration: true,
			secretOrKey: 'dsc-ai-chatbot',
		});
	}

	async validate(payload: any) {
		return { userid: payload.sub, email: payload.username };
	}
}