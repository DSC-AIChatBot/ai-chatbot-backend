import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmotionCalendarModule } from './emotion-calendar/emotion-calendar.module';
import { ApiTestModule } from './api-test/api-test.module';

@Module({
  imports: [
    AuthModule, EmotionCalendarModule, ApiTestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
