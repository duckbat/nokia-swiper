// types/QuestionTypes.ts
import {Document} from 'mongoose';
import mongoose from 'mongoose';

type Question = Document & {
  text: string;
  createdAt: Date;
  updatedAt: Date; 
};

type Summary = Document & {
  questionId: mongoose.Types.ObjectId; // Reference to the associated question
  summaryText: string; // The generated summary text
  createdAt: Date; // Timestamp for when the summary was created
};

export {Question, Summary};
