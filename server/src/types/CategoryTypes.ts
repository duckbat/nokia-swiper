import {Document} from 'mongoose';

export type ICategory = Document & {
  text: string;
  createdBy: string; // 'AI' or 'admin'
  createdAt: Date;
};
