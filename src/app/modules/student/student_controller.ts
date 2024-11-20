import { Request, Response } from 'express';
import { StudentServices } from './student_service';
import { z } from "zod"
import studentValidaionSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // create a schema validation using zod

    



    const { student: studentData } = req.body;

    // data validation using joi
    // const { error, value} = studentValidationSchema.validate(studentData);

    // data validation using zod

    const zodparseData = studentValidaionSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodparseData);

    // if(error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }


    

    res.status(200).json({
      success: true,
      message: 'Student is successfully created',
      data: result,
    });
  } catch (err : any) {
    res.status(500).json({
      success: false,
      message: err.message ||'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students is create successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message ||'Something went wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieyed successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message ||'Something went wrong',
      error: err,
    });
  }
};


const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message ||'Something went wrong',
      error: err,
    });
  }
};


export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
