import express from 'express';
import { getSummaryBySessionId, getAllSummaries } from '../controllers/summaryController';

const router = express.Router();

router.route('/').get(getAllSummaries);
router.route('/:sessionId').get(getSummaryBySessionId);

export default router;