import express from 'express';
import { StudentController } from './student_controller';

const router = express.Router();

// will call controller func
router.post('/create-student', StudentController.createStudent);


router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deleteStudent);

router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
