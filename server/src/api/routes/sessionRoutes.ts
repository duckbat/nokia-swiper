import express from 'express';
import { createSession, addSwipe, completeSession, getAllSessions, deleteSession, deleteAllSessions } from '../controllers/sessionController';
import { body } from 'express-validator';
import { validate } from '../../middlewares';

const router = express.Router();

// Route to create a new session
router.route('/')
  .post(
    body('username').optional().isString().escape(),
    body('anonymous').isBoolean(),
    validate,
    createSession
  )
  .get(getAllSessions) // Get all sessions
  .delete(deleteAllSessions); // Delete all sessions

// Route to add a swipe to a session
router.route('/swipe')
  .post(
    body('sessionId').notEmpty().escape(),
    body('questionId').notEmpty().escape(),
    body('response').isBoolean(),
    validate,
    addSwipe
  );

// Route to mark session as complete and generate summary
router.route('/complete')
  .post(
    body('sessionId').notEmpty().escape(),
    validate,
    completeSession
  );

// Route to delete a specific session
router.route('/:sessionId')
  .delete(deleteSession);

export default router;