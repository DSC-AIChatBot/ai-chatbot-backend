// import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     canActivate(
//         context: ExecutionContext,
//     ): boolean | Promise<boolean> | Observable<boolean> {
//         const request = context.switchToHttp().getRequest();

//         const { access_token } = request.headers;
        
//         if (access_token === undefined) {
//         // 토큰이 전송되지 않았다면
//             throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//         }

//         request.user = this.validationToken(access_token);

//         return true;
//     }

//     validationToken(access_token:String):String{
//         try {
//             const verify: string = jwt.verify(token, getProcessEnv('JWT_SECRET')) as string;
//             return verify;
//         } catch (error) {
//             switch (error.message) {
//                 // 토큰에 대한 오류를 판단합니다.
//                 case 'INVALID_TOKEN':
//                 case 'TOKEN_IS_ARRAY':
//                 case 'NO_USER':
//                     throw new HttpException('NotFound',HttpStatus.NOT_FOUND);
        
//                 case 'EXPIRED_TOKEN':
//                     throw new HttpException('NonAuthoritativeInformation',HttpStatus.NON_AUTHORITATIVE_INFORMATION);
                
//                 default:
//                     throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
//             }
//         }
//     }
// }