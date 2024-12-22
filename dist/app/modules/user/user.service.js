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
exports.UserService = void 0;
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const student_model_1 = require("../student/student.model");
const acedemicSemester_model_1 = require("../academicSemester/acedemicSemester.model");
const user_utils_1 = require("./user.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_1 = __importDefault(require("http-status"));
// ----------->
const createFacultyIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    // if password is not given, use default password
    userData.password = password || config_1.default.default_password;
    // set student role
    userData.role = 'student';
    // find academic semester info
    const admissionSemester = yield acedemicSemester_model_1.AcademicSemester.findById(payload.admissionSemester);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // set manually generated id
        if (!admissionSemester) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admission semester not found!');
        }
        userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); //  array
        // create a student
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Fail to create user!');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; // reference _id
        // create a student (transaction-2)
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Fail to create student!');
        }
        // commit the transaction
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
exports.UserService = {
    createFacultyIntoDB,
};
