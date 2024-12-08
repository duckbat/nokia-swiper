import express from 'express';
import { loginAdmin } from '../controllers/authController';
import { createQuestion, updateQuestion, deleteQuestion, getAllQuestions } from '../controllers/questionController';
import { getAllSummaries, deleteAllSummaries, deleteSummaryById } from '../controllers/summaryController';
import { getAllSessions, deleteAllSessions } from '../controllers/sessionController';

const router = express.Router();

// Admin Authentication
router.post('/login', loginAdmin);

// Question Management
router.post('/questions', createQuestion);
router.put('/questions', updateQuestion);
router.delete('/questions/:questionId', deleteQuestion);
router.get('/questions', getAllQuestions);

// Summary Management
router.get('/summaries', getAllSummaries);
router.delete('/summaries', deleteAllSummaries);
router.delete('/summaries/:summaryId', deleteSummaryById); // NEW: Delete single summary

// Session Management
router.get('/sessions', getAllSessions);
router.delete('/sessions', deleteAllSessions);

export default router;
