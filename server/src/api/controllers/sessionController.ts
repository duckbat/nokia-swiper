/* eslint-disable @typescript-eslint/no-explicit-any */
// import Category from '../models/categoryModel';
import {Request, Response, NextFunction} from 'express';
import Session from '../models/sessionModel';
import Question from '../models/questionModel';
import Summary from '../models/summaryModel';
import CustomError from '../../classes/CustomError';
import {ApiResponse} from '../../types/Messages';
import {ISession} from '../../types/SessionTypes';
import {ISummary} from '../../types/SummaryTypes';
import fetchData from '../../utils/fetchData';
import {ChatCompletion} from 'openai/resources';

// Create a new session
export const createSession = async (
  req: Request,
  res: Response<ApiResponse<ISession>>,
  next: NextFunction,
) => {
  try {
    const {username, anonymous} = req.body;
    const newSession = new Session({
      username,
      anonymous,
      sessionId: new Date().getTime().toString(),
    });
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
export const addSwipe = async (
  req: Request,
  res: Response<ApiResponse<ISession>>,
  next: NextFunction,
) => {
  try {
    const {sessionId, questionId, response} = req.body;
    const session = await Session.findOne({sessionId});
    if (!session) {
      return res
        .status(404)
        .json({success: false, message: 'Session not found'});
    }
    // Check if questionId is already in session swipes
    const existingSwipe = session.swipes.find(
      (swipe) => swipe.questionId.toString() === questionId,
    );
    if (existingSwipe) {
      return res
        .status(400)
        .json({success: false, message: 'Question has already been swiped'});
    }

    // Retrieve the question text from the Question model
    const question = await Question.findById(questionId);
    if (!question) {
      return res
        .status(404)
        .json({success: false, message: 'Question not found'});
    }

    session.swipes.push({questionId, questionText: question.text, response});
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

// Get all sessions
export const getAllSessions = async (
  req: Request,
  res: Response<ApiResponse<ISession[]>>,
  next: NextFunction,
) => {
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

// Delete a session
export const deleteSession = async (
  req: Request<{sessionId: string}>,
  res: Response<ApiResponse<null>>,
  next: NextFunction,
) => {
  try {
    const {sessionId} = req.params;
    if (!sessionId) {
      throw new CustomError('Missing required field: sessionId', 400);
    }
    const session = await Session.findOneAndDelete({sessionId});
    if (!session) {
      return res
        .status(404)
        .json({success: false, message: 'Session not found'});
    }
    res.status(200).json({
      success: true,
      message: 'Session deleted',
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Delete all sessions
export const deleteAllSessions = async (
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction,
) => {
  try {
    await Session.deleteMany({});
    res.status(200).json({
      success: true,
      message: 'All sessions deleted',
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// Mark session as complete and create a summary

// Retry mechanism for fetching data from OpenAI API
const fetchDataWithRetry = async (
  url: string,
  options: any,
  retries: number = 3,
  delay: number = 2000,
): Promise<ChatCompletion> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetchData<ChatCompletion>(url, options);
      return response;
    } catch (error) {
      if (
        error instanceof CustomError &&
        error.message.includes('429') &&
        i < retries - 1
      ) {
        console.warn(
          `Rate limit hit, retrying in ${delay}ms... (${i + 1}/${retries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
  throw new CustomError('Max retries exceeded for OpenAI API', 429);
};

// Complete Session function
export const completeSession = async (
  req: Request,
  res: Response<ApiResponse<ISummary>>,
  next: NextFunction,
) => {
  try {
    const {sessionId} = req.body;
    const session = await Session.findOneAndUpdate(
      {sessionId},
      {isComplete: true},
      {new: true},
    );
    if (!session) {
      return res
        .status(404)
        .json({success: false, message: 'Session not found'});
    }

    // Extract question text and responses from the session for summary generation
    const feedback = session.swipes.map((swipe) => ({
      question: swipe.questionText,
      response: swipe.response ? 'liked' : 'disliked',
    }));

    const sessionName = session.anonymous ? 'Anonymous' : session.username;

    // Generate summary based on swipes using AI
    const prompt = `Based on the following feedback from ${sessionName}, provide a unique, creative story of 5-10 lines. The feedback represents how users felt about different aspects of an event, including whether they "liked" or "disliked" certain aspects.

    "Story Example: After exploring the Karamalmi campus, Maria submitted her thoughts. She enjoyed the variety and taste of the food, describing it as "delicious," though she found the seating areas a bit cramped.
She appreciated the accessible campus layout, which made finding classrooms easy, and was glad the Wi-Fi was stable throughout her visit. However, she noticed that the study areas were a bit noisy for her liking, and while the campus was well-lit with natural light, the recreational options seemed somewhat limited. In the library, Maria found the staff to be very friendly, though the resources felt a bit scarce. She also suggested clearer labels for the recycling bins to help make eco-friendly choices easier. "

Story:
${JSON.stringify(feedback, null, 2)}

If sessionName is not provided address the user as "Stranger" or similar type of naming in the story.
`;

    // Fetch response from OpenAI with retry mechanism
    const response = await fetchDataWithRetry(
      `${process.env.OPENAI_API_URL}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful and creative assistant providing short summary story based on user feedback.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 300,
        }),
      },
      3, // Number of retries
      2000, // Initial delay between retries in milliseconds
    );

    if (
      !response ||
      !response.choices ||
      !response.choices[0]?.message?.content
    ) {
      throw new CustomError('Failed to generate AI summary', 500);
    }

    const summaryText = response.choices[0].message.content.trim();

    // Create and save the summary
    const summary = new Summary({
      sessionId: session._id,
      summaryText: summaryText,
      timestamp: new Date(),
    });
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
