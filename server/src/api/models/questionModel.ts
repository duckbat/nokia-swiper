import {model, Schema} from 'mongoose';
import {IQuestion} from '../../types/QuestionTypes';

const QuestionSchema = new Schema<IQuestion>({
  questionId: {type: String, required: true, unique: true},
  text: {type: String, required: true},
  createdBy: {type: String, enum: ['AI', 'admin'], required: true}, // if later implementing AI adding questions
  createdAt: {type: Date, default: Date.now},
});

export default model<IQuestion>('Question', QuestionSchema);
