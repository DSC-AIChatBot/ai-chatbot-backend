import { Test, TestingModule } from '@nestjs/testing';
import { EmotionCalendarService } from './emotion-calendar.service';

describe('EmotionCalendarService', () => {
  let service: EmotionCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmotionCalendarService],
    }).compile();

    service = module.get<EmotionCalendarService>(EmotionCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
