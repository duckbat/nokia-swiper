import { Document } from 'mongoose';

export type User = Document & {
  name?: string;
  isGuest: boolean; // Indicates if the user is a guest
  createdAt: Date;
  swipes: Array<{
    questionId: string;
    liked: boolean;
  }>;
}

export type Admin = Document & {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  questionsAdded: Array<string>; // Array of questionIds added by the admin
}
