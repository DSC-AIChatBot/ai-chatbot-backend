import { EmotionCalendar } from 'src/models/emotion-calendar/entities/emotionCalendar.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { defaultValue: true })
  @Column({ default: 'google' })
  accountType: 'kakao' | 'naver' | 'google'; //DB 따라서 설정

  @Field(() => String)
  @Column()
  pw: string;

  @Field(() => String)
  @Column()
  nickName: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  gender: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field(() => String)

  @Field(() => [EmotionCalendar])
  @OneToMany(() => EmotionCalendar, emotionCalendar => emotionCalendar.user)
  emotionCalendar: EmotionCalendar[];
  //refreshToken: string;
}
