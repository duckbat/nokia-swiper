import { Document } from 'mongoose';

type User = {
  name: string;
  isGuest: boolean; // Indicates if the user is a guest
  createdAt: Date;
}

type Admin = Document & {
  username: string;
  password: string; 
  email: string;
  createdAt: Date;
}

export { User, Admin };
