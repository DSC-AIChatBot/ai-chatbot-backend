import { Column, Entity, ManyToOne, Timestamp } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/models/auth/entities/user.entity';

@ObjectType()
@Entity()
export class EmotionCalendar {
    @Field(() => Timestamp)
    @Column()
    createAt: Timestamp;

    @Field(() => [String])
    @Column()
    emotion: [String];

    @Field(() => [String])

    @ManyToOne(() => User, user => user.emotionCalendar, { nullable: false, onDelete: 'CASCADE' })
    user: User;
}