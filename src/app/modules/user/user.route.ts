import { UserController } from './user.controller';
import { createStudentValidaionSchema } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';
import express from 'express';

const router = express.Router();

// parser
router.post(
  '/create-student',
  validateRequest(createStudentValidaionSchema),
  UserController.createStudent,
);

export const UserRotues = router;
