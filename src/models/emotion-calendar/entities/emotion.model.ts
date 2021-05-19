import * as mongoose from 'mongoose';
import { Document } from 'mongoose';


export const EmotionSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  emotion : { type: [String], required: true },
  // emotion_calendar : [Object]
});
export interface Emotion extends Document{
  readonly createdAt: Date,
  readonly emotion: [String],
  // readonly emotion_calendar: [any]
};