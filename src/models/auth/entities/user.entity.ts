import { Entity, Column, PrimaryColumn } from 'typeorm';

export interface KakaoUser {
  id: string;
  pw: string;
  nickName: string;
  email: string;
  gender: string;
  age: number;
  accountType: 'kakao' | 'naver' | 'google'; //DB 따라서 설정
  emotion_calendar: [any];
  //refreshToken: string;
}
@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: number;
  /* primaryColumn 뭘로*/
  @PrimaryColumn()
  accountType: 'kakao' | 'naver' | 'google';

  @Column()
  pw: string;

  @Column()
  nickName: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  age: string;

  @Column()
  emotional_calendar: [any];
}
