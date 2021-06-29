import { Controller, Get, Post, Req } from '@nestjs/common';
import { EmotionCalendarService } from './emotion-calendar.service';

@Controller('emotion-calendar')
export class EmotionCalendarController {
  constructor(
    private readonly emotionService: EmotionCalendarService) {}

  @Get('')
  emotionTest(@Req() req){
    return this.emotionService.emotionTest();
  }
  @Post()
  emotionCreateTest(@Req() req){
    return this.emotionService.emotionCreate(req);
  }

}
