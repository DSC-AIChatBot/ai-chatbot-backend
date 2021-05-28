/* eslint-disable no-unused-vars */
import {  Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { postMessagesInput } from './dto/input/post-message.input';
import { Id } from './models/id';
import { Message } from './models/message';
@Resolver(() => Message)
export class ChatResolver {
    constructor(private readonly chatService: ChatService) { }
    
    @Query(() => [Message])
    getMessages() {
        return this.chatService.getMessage();
    }

    @Mutation(() => Id!)
    postMessage(@Args('postMessageData') postMessageData: postMessagesInput) {
        return this.chatService.postMessage(postMessageData);
    }

    @Subscription(() => Message)
    subscribeMessage() {
        return this.chatService.subscribeMessage();
    }
}
