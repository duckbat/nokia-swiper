import express, {Request, Response} from 'express';
import {MessageResponse} from '../types/Messages';
import sessionRoute from './routes/sessionRoutes';
import questionRoute from './routes/questionRoutes';
import summaryRoute from './routes/summaryRoutes';
import adminRoute from './routes/adminRoutes'; // Add admin route

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req: Request, res: Response) => {
  res.json({
    message: 'api v1',
  });
});

// Routes
router.use('/sessions', sessionRoute);
router.use('/questions', questionRoute);
router.use('/summaries', summaryRoute);
router.use('/admin', adminRoute); // NEW admin route

export default router;
