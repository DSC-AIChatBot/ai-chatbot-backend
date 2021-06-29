import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from 'src/providers/database/mongo/mongo.module';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { ChatSchema } from './models/chat.model';
@Module({
  imports: [
    HttpModule,
    MongoModule,
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
  ],
  providers: [ChatService,ChatResolver],
  exports: [ChatService],
})

export class ChatModule { }
