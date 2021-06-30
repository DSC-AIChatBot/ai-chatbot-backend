import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import { MongoService } from 'src/providers/database/mongo/mongo.service';
import { postMessagesInput } from './dto/input/post-message.input';
import { Chat, ChatSchema } from './models/chat.model';
import { Document } from 'mongoose';
import axios  from 'axios';

const DATA_URL = 'http://192.168.101.182:4000/message_post';

//const TEST_DATA_URL = 'http://0.0.0.0:4000/test';
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

  arrayKey = new Date();
  
  onMessagesUpdates = (fn : Function) => this.subscribers.push(fn);
  
  async getMessages(userId: string) {
    // console.log('gegegT',userId);

    try {
      const chat = await this.mongoservice.findOne<Chat>({ guestId : userId }, this.chatModel);
      if(chat) {
        return chat.messages;
      } else {
        return [];
      }
    } catch (error) {
      console.log('err',error);
    }
  }

  async postMessage(postMessageData : postMessagesInput) {
    const { userId, role, content } = postMessageData;

    if(content){

   
    console.log('post message data',postMessageData);
    const resContent = await axios({
          url: DATA_URL,
          method: 'post',
          params: {
            message: content,
          }
        });
    // console.log('ㅁㅁ',resContent.data);
    // 채팅방 유무 확인
    try {
      const chat = await this.mongoservice.findOne<Chat>({ guestId : userId }, this.chatModel);

      if(chat) {
        const inputData:any = {
          guestId : userId,
          messages: [{
            // id : this.arrayKey,
            role: role,
            content: content,
          },{
            // id : this.arrayKey,
            role: 'guest',
            content: resContent.data,
          }],
          createdAt : new Date().toISOString()
        };
        await this.mongoservice.findOneAndUpdate<Chat>({ guestId : userId }, this.chatModel, {
          $push: {
            messages: inputData.messages
          }
        });
      }

      if(!chat) {
          const inputData: any = {
            guestId : userId,
            messages: [{
              role,
              content
            },{
              // id : this.arrayKey,
              role: 'guest',
              content: resContent.data,
            }],
            createdAt : new Date().toISOString()
          };

          const inputData_Chat:Chat = new this.chatModel(inputData);

          await this.mongoservice.create<Chat>(inputData_Chat, this.chatModel);
        }
      }
     catch(error) {
      console.log(error);
    }
    this.pubsub.publish('messageAdded', { messageAdded : { id : this.arrayKey, ...postMessageData } });
  }

    const responsePostMessage = {... postMessageData, role: 'chatbot'};
    const returnData = {
      ...responsePostMessage, id : this.arrayKey 
    };
    // return { ...postMessageData, id : this.arrayKey };

    // console.log('return data',returnData);
    return returnData;
  }
  
  messageAdded() {
    return this.pubsub.asyncIterator('messageAdded');
  }
}
