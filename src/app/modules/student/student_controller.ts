import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student_service';
import sendResponse from '../../utils/sendResponse';


const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.ok,
      success: true,
      message: 'Student is retrieved successfully ',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.ok,
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.ok,
      success: true,
      message: 'Student is deleted successfully created',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
