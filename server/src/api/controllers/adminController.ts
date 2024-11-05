import { Request, Response, NextFunction } from 'express';
import Summary from '../models/summaryModel';
import { Parser } from 'json2csv';
import CustomError from '../../classes/CustomError';


// Admin: Download all summaries as CSV
export const downloadSummariesAsCsv = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summaries = await Summary.find();
    const fields = ['sessionId', 'categories', 'timestamp'];
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(summaries);
    res.header('Content-Type', 'text/csv');
    res.attachment('summaries.csv');
    return res.send(csv);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// TODO: Implement admin functionalities and login logic