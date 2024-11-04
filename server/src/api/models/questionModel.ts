import {model, Schema} from 'mongoose';
import {Question} from '../../types/QuestionTypes';

const QuestionSchema = new Schema<Question>({
    question_id: { type: String, required: true, unique: true },
    text: { type: String, required: true },
});

export default model<Question>('Question', QuestionSchema);