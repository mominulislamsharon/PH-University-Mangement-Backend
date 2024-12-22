import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './OfferedCourse.Validation';
import { OfferedCourseControllers } from './OfferedCourse.Controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

export const offeredCourseRoutes = router;
