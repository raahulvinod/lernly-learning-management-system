import express from 'express';

import {
  addAnswer,
  addQuestion,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  replyToReview,
  uploadCourse,
} from '../controllers/course.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const courseRouter = express.Router();

courseRouter.post(
  '/create-course',
  isAuthenticated,
  authorizeRoles('admin'),
  uploadCourse
);

courseRouter.put(
  '/edit-course/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  editCourse
);

courseRouter.get('/edit-course/:id', getSingleCourse);

courseRouter.get('/get-courses', getAllCourse);

courseRouter.get('/get-courses-content/:id', isAuthenticated, getCourseByUser);

courseRouter.put('/add-question', isAuthenticated, addQuestion);

courseRouter.put('/add-answer', isAuthenticated, addAnswer);

courseRouter.put('/add-review/:id', isAuthenticated, addReview);

courseRouter.put(
  '/add-reply',
  isAuthenticated,
  authorizeRoles('admin'),
  replyToReview
);

courseRouter.get(
  '/get-all-courses',
  isAuthenticated,
  authorizeRoles('admin'),
  getAllCourses
);

courseRouter.post('/getVdoCipherOTP', generateVideoUrl);

courseRouter.delete(
  '/delete-course/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  deleteCourse
);

export default courseRouter;
