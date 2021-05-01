import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmotionCalendarModule } from './emotion-calendar/emotion-calendar.module';

@Module({
  imports: [AuthModule, EmotionCalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
