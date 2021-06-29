import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/auth.model';
import { MongoService } from 'src/providers/database/mongo/mongo.service';
import { postMessagesInput } from './dto/input/post-message.input';
import { Chat } from './models/chat.model';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel("Chat") private readonly chatModel: Model<Chat>,
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly http: HttpService,
    private readonly mongoservice: MongoService,
  ) { }

  pubsub = new PubSub();

  messages = [{ id : 0, role : "guest", content : "hello"}];

  subscribers = [];
  
  onMessagesUpdates = (fn : Function) => this.subscribers.push(fn);
  
  getMessages() {
    return this.messages;
  }

  async postMessage(postMessageData : postMessagesInput) {
    const { userId, role, content } = postMessageData;
    const id = this.messages.length;

    try {
      // userId 에 해당하는 유저 조회
      const user = await this.mongoservice.findOne<User>({ id: `${userId}` }, this.userModel);
      // 해당 유저 있으면, 해당 유저 id 와 함께 채팅방 개설 ( guestId , messages )
      if(user) {
        const inputData: any = {
          guestId : user.id,
          messages: [{
            role,
            content
          }],
          createdAt : new Date().toISOString()
        };

        await this.mongoservice.create<Chat>(inputData, this.chatModel);
      }
      
      // if(chat.) {
        
      // }
    } catch(error) {
      console.log(error);
    }
    

    this.pubsub.publish('messageAdded', { messageAdded : { id, ...postMessageData } });
    
    return { ...postMessageData, id };
  }
  
  messageAdded() {
    return this.pubsub.asyncIterator('messageAdded');
  }
}
