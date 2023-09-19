import express from 'express';

import { uploadCourse } from '../controllers/course.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const courseRouter = express.Router();

courseRouter.post(
  '/create-course',
  isAuthenticated,
  authorizeRoles('admin'),
  uploadCourse
);

export default courseRouter;
