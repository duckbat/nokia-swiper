import {model, Schema} from 'mongoose';
import {ISummary} from '../../types/SummaryTypes'; // Adjust the path as necessary

const SummarySchema = new Schema<ISummary>({
  sessionId: {type: Schema.Types.ObjectId, required: true, ref: 'UserSession'},
  categories: {type: Map, of: String, required: true}, // Using Map for dynamic categories
  timestamp: {type: Date, default: Date.now},
});

export default model<ISummary>('Summary', SummarySchema);
