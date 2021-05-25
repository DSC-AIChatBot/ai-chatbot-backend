import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/configuration.service';

const PORT = 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const appConfig: AppConfigService = app.get('AppConfigService');

  app.enableCors();

  await app.listen(appConfig.port);
}
bootstrap();
