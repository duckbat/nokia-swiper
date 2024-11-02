import { Document } from 'mongoose';

export type Summary = Document & {
  userId: string;
  tech: boolean;
  food: boolean;
  people: boolean;
  atmosphere: boolean;
  createdAt: Date;
}
