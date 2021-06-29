import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import { MongoService } from 'src/providers/database/mongo/mongo.service';
import { postMessagesInput } from './dto/input/post-message.input';
import { Chat } from './models/chat.model';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel("Chat") private readonly chatModel: Model<Chat>,
    private readonly http: HttpService,
    private readonly mongoservice: MongoService,
  ) { }

  pubsub = new PubSub();

  // messages = [{ id : 0, role : "guest", content : "hello"}];

  subscribers = [];
  
  onMessagesUpdates = (fn : Function) => this.subscribers.push(fn);
  
  async getMessages(userId: string) {
    try {
      const chat = await this.mongoservice.findOne({ guestId : userId }, this.chatModel);
      if(chat) {
        return chat;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async postMessage(postMessageData : postMessagesInput) {
    const { userId, role, content } = postMessageData;
    // 채팅방 유무 확인
    try {
      const chat = await this.mongoservice.findOne({ guestId : userId }, this.chatModel);

      if(chat) {
        const inputData: any = {
          guestId : userId,
          messages: [{
            role,
            content
          }],
          createdAt : new Date().toISOString()
        };

        await this.mongoservice.findOneAndUpdate({ guestId : userId }, this.chatModel, {
          $push: {
            messages: inputData
          }
        });
      }

      if(!chat) {
          const inputData: any = {
            guestId : userId,
            messages: [{
              role,
              content
            }],
            createdAt : new Date().toISOString()
          };
  
          await this.mongoservice.create<Chat>(inputData, this.chatModel);
        }
      }
     catch(error) {
      console.log(error);
    }

    this.pubsub.publish('messageAdded', { messageAdded : { id : new Date(), ...postMessageData } });
    
    return { ...postMessageData, id : new Date() };
  }
  
  messageAdded() {
    return this.pubsub.asyncIterator('messageAdded');
  }
}
