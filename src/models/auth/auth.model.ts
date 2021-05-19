import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id : { type: String, required: true },
});

export interface User extends Document{
    readonly id: string,
};