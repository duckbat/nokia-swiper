import {model, Schema} from 'mongoose';
import {userResponse} from '../../types/ResponseTypes';

const ResponseSchema = new Schema<userResponse>({
  question_id: {type: String, required: true},
  response: {type: String, enum: ['left', 'right'], required: true},
  timestamp: {type: Date, default: Date.now},
  session_id: {type: String},
});

export default model<userResponse>('Response', ResponseSchema);
