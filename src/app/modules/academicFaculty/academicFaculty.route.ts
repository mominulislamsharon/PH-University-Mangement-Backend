import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.Validation';
import { AcademicFacultyController } from './academicFaculty.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', auth(), AcademicFacultyController.getAllAcademicFaculties);

router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updatedAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updatedAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
