import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Chat {
    @Field()
    id : string;
    content : string;
    user : string;
}