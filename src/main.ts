import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * cors 허용 whitelist
   * 1. http://localhost:3000, 개발 환경 react 서버 url
   * 2.
   */
  const whitelist = ['http://localhost:3000','http://localhost:3000'];

  /**
   * cors error handler
   * 개발 환경 whitelist cors polcy 를 허용한다.
   */
  app.enableCors();

  await app.listen(PORT);
}
bootstrap();
