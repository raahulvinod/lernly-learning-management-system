import express from 'express';

import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import {
  createOrder,
  getAllOrders,
  sendStripePublishableKey,
  stripePayment,
} from '../controllers/order.controller';
import { updateAccessToken } from '../controllers/user.controller';

const orderRouter = express.Router();

orderRouter.post('/create-order', isAuthenticated, createOrder);

orderRouter.get(
  '/get-orders',
  updateAccessToken,
  isAuthenticated,
  authorizeRoles('admin'),
  getAllOrders
);

orderRouter.get('/payment/stripe-publishable-key', sendStripePublishableKey);

orderRouter.post('/payment', isAuthenticated, stripePayment);

export default orderRouter;
