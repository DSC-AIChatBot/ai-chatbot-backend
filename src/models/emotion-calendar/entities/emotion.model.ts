import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const EmotionSchema = new mongoose.Schema({
  createdAt: { type: String, required: true },
  emotion: { type: String, required: true },
});
export interface Emotion extends Document {
  readonly createdAt: string;
  readonly emotion: string;
}
