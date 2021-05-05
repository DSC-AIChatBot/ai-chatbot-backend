import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmotionCalendarModule } from './emotion-calendar/emotion-calendar.module';
import { ApiTestModule } from './api-test/api-test.module';
import { ConfigModule} from '@nestjs/config';
@Module({
  imports: [AuthModule, EmotionCalendarModule, ApiTestModule, ConfigModule.forRoot({
    envFilePath: '.env.dev',
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
