/* eslint-disable no-unused-vars */
import {  Args, ID, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { postMessagesInput } from './dto/input/post-message.input';
import { Message } from './models/message';
@Resolver(() => Message)
export class ChatResolver {
    constructor(private readonly chatService: ChatService) { }
    
    @Query(() => [Message])
    getMessages(@Args('userId',{ type: () => String! }) userId: string) {
        return this.chatService.getMessages(userId);
    }

    @Mutation(() => Message)
    postMessage(@Args('postMessageData') postMessageData: postMessagesInput) {
        return this.chatService.postMessage(postMessageData);
    }

    @Subscription(() => Message)
    messageAdded(@Args('postId',{ type: () => ID! }) postId: number) {
        return this.chatService.messageAdded();
    }
}
 