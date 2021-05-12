import { Module } from '@nestjs/common';
import { EmotionCalendarService } from './emotion-calendar.service';
import { EmotionCalendarController } from './emotion-calendar.controller';

@Module({
  providers: [EmotionCalendarService],
  controllers: [EmotionCalendarController]
})
export class EmotionCalendarModule {}
