/* eslint-disable no-unused-vars */
import {  Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { postMessagesInput } from './dto/input/post-message.input';
import { Chat } from './models/chat';
@Resolver(() => Chat)
export class ChatResolver {
    constructor(private readonly chatService: ChatService) { }

    @Query()
    getMessage() {
        return this.chatService.getMessage();
    }

    @Mutation(() => Chat)
    postMessage(@Args('postMessages') postMessageData : postMessagesInput) {
        return this.chatService.postMessage(postMessageData);
    }

    @Subscription()
    subscribe() {
        return this.chatService.subscribe();
    }
}
