import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// parser
router.post('/create-student', UserController.createStudent);

export const UserRotues = router;