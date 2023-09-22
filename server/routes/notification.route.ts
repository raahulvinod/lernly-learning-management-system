import express from 'express';

import {
  getNotifications,
  updateNotification,
} from '../controllers/notification.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const notificatioRouter = express.Router();

notificatioRouter.get(
  '/get-all-notification',
  isAuthenticated,
  authorizeRoles('admin'),
  getNotifications
);

notificatioRouter.put(
  '/update-notification/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  updateNotification
);

export default notificatioRouter;
