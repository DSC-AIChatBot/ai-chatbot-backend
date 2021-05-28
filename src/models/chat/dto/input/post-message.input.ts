import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class postMessagesInput {
    @Field()
    role: string;

    @Field()
    content: string;
}
