import { Request, Response, NextFunction } from 'express';
import Summary from '../models/summaryModel';
import CustomError from '../../classes/CustomError';
import { ApiResponse } from '../../types/Messages';
import { ISummary } from '../../types/SummaryTypes';

// Get a summary by session ID
export const getSummaryBySessionId = async (req: Request, res: Response<ApiResponse<ISummary>>, next: NextFunction) => {
  try {
    const { sessionId } = req.params;
    const summary = await Summary.findOne({ sessionId });
    if (!summary) {
      return res.status(404).json({ success: false, message: 'Summary not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Summary retrieved',
      data: summary,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Get all summaries
export const getAllSummaries = async (req: Request, res: Response<ApiResponse<ISummary[]>>, next: NextFunction) => {
  try {
    const summaries = await Summary.find();
    res.status(200).json({
      success: true,
      message: 'Summaries retrieved',
      data: summaries,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Delete all summaries
export const deleteAllSummaries = async (req: Request, res: Response<ApiResponse<null>>, next: NextFunction) => {
  try {
    await Summary.deleteMany({});
    res.status(200).json({
      success: true,
      message: 'All summaries deleted',
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Delete a single summary by ID
export const deleteSummaryById = async (req: Request<{ summaryId: string }>, res: Response<ApiResponse<null>>, next: NextFunction) => {
  try {
    const { summaryId } = req.params;
    if (!summaryId) {
      throw new CustomError('Missing required field: summaryId', 400);
    }
    const summary = await Summary.findByIdAndDelete(summaryId);
    if (!summary) {
      return res.status(404).json({ success: false, message: 'Summary not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Summary deleted',
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};
