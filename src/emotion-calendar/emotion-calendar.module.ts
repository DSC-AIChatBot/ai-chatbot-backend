import { HttpModule, Module } from '@nestjs/common';
import { EmotionCalendarService } from './emotion-calendar.service';
import { EmotionCalendarController } from './emotion-calendar.controller';
import { MongoModule } from 'src/providers/database/mongo/mongo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmotionSchema } from './entities/emotion.model';

@Module({
  imports: [
    HttpModule,
    MongoModule,
    MongooseModule.forFeature([{name: 'emotion_calendar', schema: EmotionSchema}])
  ],
  providers: [EmotionCalendarService],
  controllers: [EmotionCalendarController]
})
export class EmotionCalendarModule {}
