import { Document } from 'mongoose';

export type userResponse = Document & {
  question_id: string;
  response: 'left' | 'right';
  timestamp: Date;
  session_id?: string;
}