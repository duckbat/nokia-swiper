import { Request, Response, NextFunction } from 'express';
import Session from '../models/sessionModel';
import Summary from '../models/summaryModel';
import CustomError from '../../classes/CustomError';
import { ApiResponse } from '../../types/Messages';
import { ISession } from '../../types/SessionTypes';
import { ISummary } from '../../types/SummaryTypes';

// Create a new session
export const createSession = async (req: Request, res: Response<ApiResponse<ISession>>, next: NextFunction) => {
  try {
    const { username, anonymous } = req.body;
    const newSession = new Session({ username, anonymous, sessionId: new Date().getTime().toString() });
    const savedSession = await newSession.save();
    res.status(201).json({
      success: true,
      message: 'Session created',
      data: savedSession,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Add swipes to a session
export const addSwipe = async (req: Request, res: Response<ApiResponse<ISession>>, next: NextFunction) => {
  try {
    const { sessionId, questionId, response } = req.body;
    const session = await Session.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }
    session.swipes.push({ questionId, response });
    const updatedSession = await session.save();
    res.status(200).json({
      success: true,
      message: 'Swipe added',
      data: updatedSession,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Mark session as complete and create a summary
export const completeSession = async (req: Request, res: Response<ApiResponse<ISummary>>, next: NextFunction) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findOneAndUpdate({ sessionId }, { isComplete: true }, { new: true });
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }

    // Generate summary based on swipes
    // TODO: Implement AI logic to generate summary based on swipes
    const summaryData: Record<string, string> = {};
    session.swipes.forEach((swipe) => {
      // Assuming categories are assigned based on question content
      const category = "default"; // Placeholder: Replace with real category logic
      summaryData[category] = swipe.response ? "liked" : "disliked";
    });

    const summary = new Summary({ sessionId: session, categories: summaryData });
    const savedSummary = await summary.save();
    res.status(200).json({
      success: true,
      message: 'Session completed and summary created',
      data: savedSummary,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Get all sessions
export const getAllSessions = async (req: Request, res: Response<ApiResponse<ISession[]>>, next: NextFunction) => {
  try {
    const sessions = await Session.find();
    res.status(200).json({
      success: true,
      message: 'Sessions retrieved',
      data: sessions,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};