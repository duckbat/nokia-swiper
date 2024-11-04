import { Document } from 'mongoose';

export type Question = Document & {
  question_id: string ;
  text: string;
}
