import {Request, Response, NextFunction} from 'express';
import Session from '../models/sessionModel';
import Question from '../models/questionModel';
import Summary from '../models/summaryModel';
import Category from '../models/categoryModel';
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
export const completeSession = async (
  req: Request,
  res: Response<ApiResponse<ISummary>>,
  next: NextFunction,
) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findOneAndUpdate(
      { sessionId },
      { isComplete: true },
      { new: true },
    );
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: 'Session not found' });
    }

    // Extract question text and responses from the session for summary generation
    const feedback = session.swipes.map((swipe) => ({
      question: swipe.questionText,
      response: swipe.response ? 'liked' : 'disliked',
    }));

    // Mock categories for the summary
    // const categories = [
    //   'Food Quality',
    //   'Event Organization',
    //   'Venue Atmosphere',
    //   'Staff Friendliness',
    //   'Tech Experience',
    // ];
    
    // Retrieve categories from the database
    const categoriesDocs = await Category.find({});
    const categories = categoriesDocs.map((category) => category.text);


    // Generate summary based on swipes using AI
    const prompt = `Based on the following feedback, provide a unique description for each category listed below for the user. The feedback represents how users felt about different aspects of an event, including whether they "liked" or "disliked" certain aspects.

Categories: ${categories.join(', ')}

Feedback:
${JSON.stringify(feedback, null, 2)}

For each category, write a brief and descriptive summary based on the feedback in the format: "Category: Description" Description example: "You had a positive experience and enjoyed the overall organization of the event."
If there is no feedback for a particular category, provide a suitable general description. Be concise but descriptive.`;

    const response = await fetchData<ChatCompletion>(
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
                'You are a helpful assistant providing summaries based on user feedback.',
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
    );

    if (
      !response ||
      !response.choices ||
      !response.choices[0]?.message?.content
    ) {
      throw new CustomError('Failed to generate summary using AI', 500);
    }

    const summaryText = response.choices[0].message.content.trim();

    // Parse AI summary response into categories
    const summaryData: Record<string, { description: string }> = {};
    const summaryLines = summaryText.split('\n');
    summaryLines.forEach((line) => {
      const match = line.match(/^([\w\s]+):\s*(.*)$/);
      if (match) {
        const [, category, description] = match;
        summaryData[category.trim()] = {
          description: description.trim(),
        };
      }
    });

    // Fill in categories without feedback if not provided by AI
    categories.forEach((category) => {
      if (!summaryData[category]) {
        summaryData[category] = {
          description: 'No specific feedback provided',
        };
      }
    });

    // Create and save the summary
    const summary = new Summary({
      sessionId: session._id,
      categories: summaryData,
      summaryText,
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
