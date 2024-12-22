import { UserController } from './user.controller';
import { createStudentValidaionSchema } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';
import express from 'express';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.valitaion';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

// parser
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidaionSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRotues = router;
