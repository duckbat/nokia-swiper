import {model, Schema} from 'mongoose';
import {ISummary} from '../../types/SummaryTypes'; // Adjust the path as necessary

const SummarySchema = new Schema<ISummary>({
  sessionId: {type: Schema.Types.ObjectId, required: true, ref: 'Session'},
  summaryText: {type: String, required: true}, // renamed to match the controller
  timestamp: {type: Date, default: Date.now},
});

export default model<ISummary>('Summary', SummarySchema);
