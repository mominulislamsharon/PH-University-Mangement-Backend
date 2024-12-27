import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationController.getAllSemesterRegistration,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    semesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  semesterRegistrationController.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
