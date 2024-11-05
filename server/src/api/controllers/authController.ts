import { Request, Response, NextFunction } from 'express';
import Admin from '../models/adminModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CustomError from '../../classes/CustomError';
import { ApiResponse } from '../../types/Messages';

export const loginAdmin = async (req: Request, res: Response<ApiResponse<{ token: string }>>, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { token },
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};
