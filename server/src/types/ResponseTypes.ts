import {Document} from 'mongoose';
import mongoose from 'mongoose';

type Response = Document & {
  questionId: mongoose.Types.ObjectId; // Reference to the associated question
  userName: string; // Name provided by the user (can be guest)
  responseType: 'like' | 'dislike'; // User's response type
  createdAt: Date; // Timestamp for when the response was created
};

type AddResponseRequest = {
  questionId: string; // ID of the associated question
  userName: string; // Name provided by the user
  responseType: 'like' | 'dislike'; // Type of response
};

export {Response, AddResponseRequest};
