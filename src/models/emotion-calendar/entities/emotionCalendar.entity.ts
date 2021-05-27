import { Column, Entity, ManyToOne, Timestamp } from 'typeorm';
import { User } from 'src/models/auth/entities/user.entity';

@Entity()
export class EmotionCalendar {
    @Column()
    createAt: Timestamp;

    @Column()
    emotion: [String];

    @ManyToOne(() => User, user => user.emotionCalendar, { nullable: false, onDelete: 'CASCADE' })
    user: User;
}