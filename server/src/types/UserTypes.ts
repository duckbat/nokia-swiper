import { Document } from 'mongoose';

type User = {
  name: string;   // User's name for the session
  isGuest: boolean; // Indicates if the user is a guest
}

type Admin = Document & {
  username: string;      // Admin username
  passwordHash: string;  // Hashed password for security
  role: 'superadmin' | 'editor'; // Role type for admin
}

export { User, Admin };
