import express from 'express';
import {
  getSummaryBySessionId,
  getAllSummaries,
  deleteAllSummaries
} from '../controllers/summaryController';

const router = express.Router();

router.route('/').get(getAllSummaries).delete(deleteAllSummaries);
router.route('/:sessionId').get(getSummaryBySessionId);

export default router;