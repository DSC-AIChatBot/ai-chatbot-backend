import { Test, TestingModule } from '@nestjs/testing';
import { ApiTestController } from './api-test.controller';

describe('ApiTestController', () => {
  let controller: ApiTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiTestController],
    }).compile();

    controller = module.get<ApiTestController>(ApiTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
