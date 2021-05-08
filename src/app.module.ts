import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './models/auth/auth.module';
import { EmotionCalendarModule } from './models/emotion-calendar/emotion-calendar.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/app/configuration.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    EmotionCalendarModule,
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
