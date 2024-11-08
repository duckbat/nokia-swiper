import { Request, Response, NextFunction } from 'express';
import Summary from '../models/summaryModel';
import { Parser } from 'json2csv';
import CustomError from '../../classes/CustomError';
// import { ApiResponse } from '../../types/Messages';


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

// TODO: Add (Add Category) functionality to summary  

// TODO: Implement admin functionalities and login logic

// // Get data for graph visualization (e.g., for Food ratings)
// export const getFoodRatingsData = async (req: Request, res: Response<ApiResponse<{ timestamp: Date, rating: number }[]>>, next: NextFunction) => {
//   try {
//     const summaries = await Summary.find({ "categories.Food": { $exists: true } });
//     const foodRatingsData = summaries.map((summary) => ({
//       timestamp: summary.timestamp,
//       rating: summary.categories.get('Food').rating,
//     }));
//     res.status(200).json({
//       success: true,
//       message: 'Food ratings data retrieved',
//       data: foodRatingsData,
//     });
//   } catch (error) {
//     next(new CustomError((error as Error).message, 500));
//   }
// };
