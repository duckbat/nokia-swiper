import { Document } from 'mongoose';
import mongoose from 'mongoose';

type Summary = Document & {
  questionId: mongoose.Types.ObjectId; // Reference to the associated question
  summaryText: string; // The generated summary text
  responseIds: mongoose.Types.ObjectId[]; // Array of IDs of responses used in the summary
  createdAt: Date;
};

type AddSummaryRequest = {
  questionId: string; // ID of the associated question
  summaryText: string; // The generated summary text
  responseIds: string[]; // Array of response IDs used to generate the summary
};

export { Summary, AddSummaryRequest };
