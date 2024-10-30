import {Document} from 'mongoose';
import mongoose from 'mongoose';

type Summary = Document & {
  questionId: mongoose.Types.ObjectId; // Reference to the associated question
  summaryText: string; // The generated summary text
  createdAt: Date;
};

type AddSummaryRequest = {
  questionId: string; // ID of the associated question
  summaryText: string; // The generated summary text
};

export {Summary, AddSummaryRequest};