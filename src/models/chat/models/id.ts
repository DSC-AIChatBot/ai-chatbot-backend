import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Id {
    @Field()
    id : number;
}