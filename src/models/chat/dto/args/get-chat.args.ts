import  { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetMessage {
    @Field()
    messages : string;
}