import { Document } from 'mongoose';

export type Question = Document & {
  text: string;
  category: string;
  createdBy: string; // 'AI' or 'Admin'
  createdAt: Date;
}
