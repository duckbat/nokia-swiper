import {NextFunction, Request, Response} from 'express';
import CustomError from './classes/CustomError';
import {ErrorResponse} from './types/Messages';
import { FieldValidationError, validationResult } from 'express-validator';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // console.log('errorhanler', err);
  const statusCode = err.status !== 200 ? err.status || 500 : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const validate = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${(error as FieldValidationError).path}`)
      .join(', ');
    next(new CustomError(messages, 400));
    return;
  }
  next();
};

export {notFound, errorHandler, validate};