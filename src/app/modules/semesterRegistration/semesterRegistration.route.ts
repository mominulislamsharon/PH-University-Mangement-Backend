import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);

router.get('/', semesterRegistrationController.getAllSemesterRegistration);

router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/:id',
  semesterRegistrationController.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
