import {model, Schema} from 'mongoose';
import {ISession} from '../../types/SessionTypes';

const SessionSchema = new Schema<ISession>({
  sessionId: {type: String, required: true, unique: true},
  username: {type: String, required: false}, // Optional
  anonymous: {type: Boolean, required: true},
  swipes: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      }, // Reference to Question model
      response: 
      {type: Boolean, 
        required: true
    }, // True for like, false for dislike
    },
  ],
  isComplete: {type: Boolean, default: false}, // Default value to indicate if the session is complete
});

export default model<ISession>('Session', SessionSchema);
