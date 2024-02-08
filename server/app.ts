import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';

import { ErrorMiddleware } from './middleware/error';

import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route';
import notificatioRouter from './routes/notification.route';
import analyticsRouter from './routes/analytics.route';
import layoutRouter from './routes/layout.route';

export const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.use(
  cors({
    origin: ['https://learnlyeducation.vercel.app'],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

// routes
app.use(
  '/api/v1',
  userRouter,
  courseRouter,
  orderRouter,
  notificatioRouter,
  analyticsRouter,
  layoutRouter
);

// Testing api
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: 'API is working',
  });
});

// Unknown route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found.`) as any;
  err.statusCode = 404;
  next(err);
});

// Rate limiting middleware to all requests.
app.use(limiter);

app.use(ErrorMiddleware);
