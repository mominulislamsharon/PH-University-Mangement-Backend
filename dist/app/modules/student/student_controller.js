"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student_service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getAllStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentsFromDB();
        (0, sendResponse_1.default)(res, {
            statusCode: httpStatus.ok,
            success: true,
            message: 'Student is retrieved successfully ',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getSingleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.getSingleStudentFromDB(studentId);
        (0, sendResponse_1.default)(res, {
            statusCode: httpStatus.ok,
            success: true,
            message: 'Student are retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.deleteStudentFromDB(studentId);
        (0, sendResponse_1.default)(res, {
            statusCode: httpStatus.ok,
            success: true,
            message: 'Student is deleted successfully created',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
};
