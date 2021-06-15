import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { postMessagesInput } from './dto/input/post-message.input';
@Injectable()
export class ChatService {
  constructor() { }

  pubsub = new PubSub();
  messages = [{ id : 0, role : "guest", content : "hello"}];
  subscribers = [];
  onMessagesUpdates = (fn : Function) => this.subscribers.push(fn);

  getMessages() {
    return this.messages;
  }

  async postMessage(postMessageData : postMessagesInput) {   
    const id = this.messages.length;

    this.messages.push({ id , ...postMessageData });

    this.pubsub.publish('messageAdded', { messageAdded : { id, ...postMessageData } });
    
    return { ...postMessageData, id };
  }
  
  messageAdded() {
    return this.pubsub.asyncIterator('messageAdded');
  }
}
