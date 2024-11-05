import express from 'express';
import { createSession, addSwipe, completeSession, getAllSessions } from '../controllers/sessionController';

const router = express.Router();

router.route('/').post(createSession).get(getAllSessions);
router.route('/swipe').post(addSwipe);
router.route('/complete').post(completeSession);

export default router;
