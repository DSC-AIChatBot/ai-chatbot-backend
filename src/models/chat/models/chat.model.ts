// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Document } from 'mongoose';

// export type ChatDocument = Chat & Document;

// @Schema()
// class Message {
//     @Prop()
//     content : string;

//     @Prop()
//     role : string;
// }

// @Schema()
// export class Chat {
//     @Prop()
//     guestId : string;

//     @Prop()
//     messages : [Message]
// }

// export const ChatSchema = SchemaFactory.createForClass(Chat);

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