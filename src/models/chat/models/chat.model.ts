import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

type Message = {
    role : string,
    content : string,
}

export const ChatSchema = new mongoose.Schema({
    guestId : { type: String, required: true },
    messages : [{
        role : String,
        content : String,
    }],
    createdAt : { type: String, required: true }
});

export interface Chat extends Document{
    readonly guestId: string,
    readonly messages: [Message],
    readonly createdAt : string,
}