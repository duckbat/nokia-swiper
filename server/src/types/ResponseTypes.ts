import {Document} from 'mongoose';
import mongoose from 'mongoose';

type Response = Document & {
  questionId: mongoose.Types.ObjectId; // Reference to the associated question
  userName: string; // Name provided by the user (can be guest)
  responseType: 'like' | 'dislike'; // User's response type
  createdAt: Date; // Timestamp for when the response was created
};



export {Response};
