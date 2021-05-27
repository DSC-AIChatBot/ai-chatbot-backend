import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class postMessagesInput {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    role: string;

    @Field()
    @IsNotEmpty()
    content: string;
}