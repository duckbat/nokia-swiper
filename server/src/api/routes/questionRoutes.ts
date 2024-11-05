import express from 'express';
import { createQuestion, updateQuestion, deleteQuestion, getAllQuestions } from '../controllers/questionController';

const router = express.Router();

router.route('/').post(createQuestion).get(getAllQuestions);
router.route('/:questionId').put(updateQuestion).delete(deleteQuestion);

export default router;