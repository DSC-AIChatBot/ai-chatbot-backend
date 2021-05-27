import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id : { type: String, required: true },
    pw : { type: String, required: true },
    nickName : { type: String, required: true },
    email : { type: String, required: true },
    gender : { type: String, required: true },
    age : { type: String, required: true },
    accountType : {type: String, required: true},
    // emotion_calendar : [Object]
});
export interface User extends Document{
    readonly id: string,
    readonly pw: string,
    readonly nickName: string,
    readonly email: string,
    readonly gender: string,
    readonly age: String,
    readonly accountType: string,
    // readonly emotion_calendar: [any]
}
