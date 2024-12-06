import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { notFound, errorHandler } from './middlewares';
import api from './api';
import { MessageResponse } from './types/Messages';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Load Swagger YAML
const swaggerDocument = YAML.load('./swagger.yaml');

// Root Endpoint
app.get<{}, MessageResponse>('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API location: api/v1 | API Documentation location: api/docs',
  });
});

// API Routes
app.use('/api/v1', api);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;