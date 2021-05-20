import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoService } from 'src/providers/database/mongo/mongo.service';
import { Emotion } from './entities/emotion.model';

@Injectable()
export class EmotionCalendarService {
  constructor(
    @InjectModel('emotion_calendar') private readonly emotionModel: Model<Emotion>,
    private readonly http: HttpService,
    private readonly mongoservice:MongoService,
  ) {}

  emotionTest() {
    return this.mongoservice.findAll<Emotion>(this.emotionModel)
  }
  emotionCreate(req): Promise<Emotion> {
    const newEmotion : Emotion = {createdAt:"adsf", emotion:"3"}
    return this.mongoservice.create<Emotion>(newEmotion, this.emotionModel);
  }
}
