import { Controller, Get } from '@nestjs/common';

@Controller('api-test')
export class ApiTestController {
  @Get()
  findAll(): string {
    return 'api-test success';
  }
}
