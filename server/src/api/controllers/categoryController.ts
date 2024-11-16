// import { Request, Response, NextFunction } from 'express';
// import Category from '../models/categoryModel';
// import CustomError from '../../classes/CustomError';
// import { ApiResponse } from '../../types/Messages';
// import { ICategory } from '../../types/CategoryTypes';

// // Create a new category
// export const createCategory = async (req: Request, res: Response<ApiResponse<ICategory>>, next: NextFunction) => {
//   try {
//     const { text, createdBy } = req.body;
//     if (!text || !createdBy) {
//       throw new CustomError('Missing required fields: text or createdBy', 400);
//     }
//     const newCategory = new Category({ text, createdBy, createdAt: new Date() });
//     const savedCategory = await newCategory.save();
//     res.status(201).json({
//       success: true,
//       message: 'Category created',
//       data: savedCategory,
//     });
//   } catch (error) {
//     next(new CustomError((error as Error).message, 500));
//   }
// };

// // Update an existing category
// export const updateCategory = async (
//   req: Request<{}, {}, { text: string; newText: string }>,
//   res: Response<ApiResponse<ICategory>>,
//   next: NextFunction
// ) => {
//   try {
//     const { text, newText } = req.body;
//     if (!text || !newText) {
//       throw new CustomError('Missing required fields: text or newText', 400);
//     }
//     const category = await Category.findOneAndUpdate({ text }, { text: newText }, { new: true });
//     if (!category) {
//       return res.status(404).json({ success: false, message: 'Category not found' });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Category updated',
//       data: category,
//     });
//   } catch (error) {
//     next(new CustomError((error as Error).message, 500));
//   }
// };

// // Delete a category
// export const deleteCategory = async (req: Request<{}, {}, { text: string }>, res: Response<ApiResponse<null>>, next: NextFunction) => {
//   try {
//     const { text } = req.body;
//     if (!text) {
//       throw new CustomError('Missing required field: text', 400);
//     }
//     const category = await Category.findOneAndDelete({ text });
//     if (!category) {
//       return res.status(404).json({ success: false, message: 'Category not found' });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Category deleted',
//     });
//   } catch (error) {
//     next(new CustomError((error as Error).message, 500));
//   }
// };

// // Get all categories
// export const getAllCategories = async (req: Request, res: Response<ApiResponse<ICategory[]>>, next: NextFunction) => {
//   try {
//     const categories = await Category.find();
//     res.status(200).json({
//       success: true,
//       message: 'Categories retrieved',
//       data: categories,
//     });
//   } catch (error) {
//     next(new CustomError((error as Error).message, 500));
//   }
// };
