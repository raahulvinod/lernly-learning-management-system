import { NextFunction, Response, Request } from 'express';

import NotificationModel from '../models/notification.model';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';

// get all notification - only for admin
export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notification,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// update notification status
export const updateNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findById(req.params.id);
      if (!notification) {
        next(new ErrorHandler('Notification not found', 500));
      } else {
        notification.status
          ? (notification.status = 'read')
          : notification?.status;
      }

      await notification?.save();

      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        notifications,
      });

      res.status(201).json({
        success: true,
        notification,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);
