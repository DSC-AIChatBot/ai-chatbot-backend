import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/configuration.service';

const PORT = 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const appConfig: AppConfigService = app.get('AppConfigService');

  /**
   * cors 허용 whitelist
   * 1. http://localhost:3000, 개발 환경 react 서버 url
   * 2.
   */
<<<<<<< HEAD
  const whitelist = ['http://localhost:3000','http://localhost:5000'];
=======
  // const whitelist = ['http://localhost:3000','http://localhost:5000'];

  // /**
  //  * cors error handler
  //  * 개발 환경 whitelist cors polcy 를 허용한다.
  //  */
  // const whitelist = ['http://localhost:3000'];
>>>>>>> 4d04e4d13c40b8d70edf88924762a1e0ef1ee237

  /**
   * cors error handler
   * 개발 환경 whitelist cors policy 를 허용한다.
   */
  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       console.log('[Allowed CORS for]:', origin);
  //       callback(null, true);
  //     } else {
  //       console.log('[Blocked CORS for]:', origin);
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });
<<<<<<< HEAD
  app.enableCors();
=======
>>>>>>> 4d04e4d13c40b8d70edf88924762a1e0ef1ee237

  await app.listen(appConfig.port);
}
bootstrap();
