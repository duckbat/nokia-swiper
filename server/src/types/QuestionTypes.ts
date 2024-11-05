import {Document} from 'mongoose';

export type IQuestion = Document & {
  questionId: string;
  text: string;
  createdBy: string; // 'AI' or 'admin'
  createdAt: Date;
};
