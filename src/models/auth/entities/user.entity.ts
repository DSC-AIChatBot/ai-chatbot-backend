import { EmotionCalendar } from 'src/models/emotion-calendar/entities/emotionCalendar.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'google' })
  accountType: 'kakao' | 'naver' | 'google'; //DB 따라서 설정

  @Column()
  pw: string;

  @Column()
  nickName: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @OneToMany(() => EmotionCalendar, emotionCalendar => emotionCalendar.user)
  emotionCalendar: EmotionCalendar[];
  //refreshToken: string;
}
