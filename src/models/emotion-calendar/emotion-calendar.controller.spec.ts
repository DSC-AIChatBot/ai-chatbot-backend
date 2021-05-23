import { Test, TestingModule } from '@nestjs/testing';
import { EmotionCalendarController } from './emotion-calendar.controller';

describe('EmotionCalendarController', () => {
  let controller: EmotionCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionCalendarController],
    }).compile();

    controller = module.get<EmotionCalendarController>(EmotionCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
