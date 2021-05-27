import { Document, Schema as MongooseSchema } from 'mongoose';

export const UserSchema = new MongooseSchema({
  id: { type: String, required: true },
});
export interface User extends Document {
  readonly id: string;
}

