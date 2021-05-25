import { Test, TestingModule } from '@nestjs/testing';
import { ApiTestService } from './api-test.service';

describe('ApiTestService', () => {
  let service: ApiTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiTestService],
    }).compile();

    service = module.get<ApiTestService>(ApiTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
