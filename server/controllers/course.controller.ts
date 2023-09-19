import { NextFunction, Request, Response } from 'express';
import cloudinart from 'cloudinary';

import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import { createCourse } from '../services/course.service';

export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;

      if (thumbnail) {
        const myCloud = await cloudinart.v2.uploader.upload(thumbnail, {
          folder: 'courses',
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
