import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { postMessagesInput } from './dto/input/post-message.input';

@Injectable()
export class ChatService {
  constructor() { }

  private pubsub = new PubSub();
  private messages = [];
  private subscribers = [];
  private onMessagesUpdates = (fn : Function) => this.subscribers.push(fn);

  public getMessage() {
    return this.messages;
  }

  public postMessage(postMessageData : postMessagesInput) {
    const id = this.messages.length;

    this.messages.push({
      id,
      ...postMessageData
    });

    this.subscribers.forEach((fn) => fn());
    return id;
  }
  
  public subscribe() {
    const channel = Math.random().toString(36).slice(2, 15);

    this.onMessagesUpdates(() => this.pubsub.publish(channel, { messages: this.messages }));

    setTimeout(() => this.pubsub.publish(channel, { messages : this.messages }), 0);

    return this.pubsub.asyncIterator(channel);
  }
}
