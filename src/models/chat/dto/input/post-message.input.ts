import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class postMessagesInput {
    @Field()
    userId: string;
    @Field()
    role: string;
    @Field()
    content: string;
}
