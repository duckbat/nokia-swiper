import {Document, Schema} from 'mongoose';

export type ISummary = Document & {
  sessionId: Schema.Types.ObjectId;
  categories: Record<string, string>; //{ tech: "liked", food: "disliked" }
  timestamp: Date;
};
