import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
    @Field()
    id : string;
    @Field()
    content : string;
    @Field()
    role : string;
}