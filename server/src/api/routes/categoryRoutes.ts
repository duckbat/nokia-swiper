import express from 'express';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from '../controllers/categoryController';

const router = express.Router();

router.route('/').post(createCategory).get(getAllCategories);
router.route('/').put(updateCategory).delete(deleteCategory);

export default router;
