import express from 'express';

import { getNotifications } from '../controllers/notification.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const notificatioRouter = express.Router();

notificatioRouter.get(
  '/get-all-notification',
  isAuthenticated,
  authorizeRoles('admin'),
  getNotifications
);

export default notificatioRouter;
