import { Document } from 'mongoose';

export type Swipe = Document & {
  userId: string;
  questionId: string;
  liked: boolean;
  createdAt: Date;
}
