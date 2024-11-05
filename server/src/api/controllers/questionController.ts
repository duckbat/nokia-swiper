import { Request, Response, NextFunction } from 'express';
import Question from '../models/questionModel';
import CustomError from '../../classes/CustomError';
import { ApiResponse } from '../../types/Messages';
import { IQuestion } from '../../types/QuestionTypes';

// Create a new question
export const createQuestion = async (req: Request, res: Response<ApiResponse<IQuestion>>, next: NextFunction) => {
  try {
    const { text, createdBy } = req.body;
    if (!text || !createdBy) {
      throw new CustomError('Missing required fields: text or createdBy', 400);
    }
    const newQuestion = new Question({ text, createdBy, questionId: new Date().getTime().toString() });
    const savedQuestion = await newQuestion.save();
    res.status(201).json({
      success: true,
      message: 'Question created',
      data: savedQuestion,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Update an existing question
export const updateQuestion = async (req: Request<{ questionId: string }, {}, { newText: string }>, res: Response<ApiResponse<IQuestion>>, next: NextFunction) => {
  try {
    const { newText } = req.body;
    const { questionId } = req.params;
    if (!questionId || !newText) {
      throw new CustomError('Missing required fields: questionId or newText', 400);
    }
    const question = await Question.findOneAndUpdate({ questionId }, { text: newText }, { new: true });
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Question updated',
      data: question,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Delete a question
export const deleteQuestion = async (req: Request<{ questionId: string }>, res: Response<ApiResponse<null>>, next: NextFunction) => {
  try {
    const { questionId } = req.params;
    if (!questionId) {
      throw new CustomError('Missing required field: questionId', 400);
    }
    const question = await Question.findOneAndDelete({ questionId });
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Question deleted',
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Get all questions
export const getAllQuestions = async (req: Request, res: Response<ApiResponse<IQuestion[]>>, next: NextFunction) => {
  try {
    const questions = await Question.find();
    res.status(200).json({
      success: true,
      message: 'Questions retrieved',
      data: questions,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};
