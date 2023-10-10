import express from 'express';

import {
  getNotifications,
  updateNotification,
} from '../controllers/notification.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controllers/user.controller';

const notificatioRouter = express.Router();

notificatioRouter.get(
  '/get-all-notification',
  updateAccessToken,
  isAuthenticated,
  authorizeRoles('admin'),
  getNotifications
);

notificatioRouter.put(
  '/update-notification/:id',
  updateAccessToken,
  isAuthenticated,
  authorizeRoles('admin'),
  updateNotification
);

export default notificatioRouter;
