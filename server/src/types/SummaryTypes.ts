import {Document, Schema} from 'mongoose';

export type ISummary = Document & {
  sessionId: Schema.Types.ObjectId;
  summaryText: string;
  timestamp: Date;
};
