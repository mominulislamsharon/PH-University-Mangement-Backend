import express from 'express';
import { StudentController } from './student_controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middleware/auth';

const router = express.Router();

// will call controller func

router.get(
  '/:id',
  auth('admin', 'faculty'),
  StudentController.getSingleStudent,
);

router.get(
  '/',

  StudentController.getAllStudents,
);

router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
