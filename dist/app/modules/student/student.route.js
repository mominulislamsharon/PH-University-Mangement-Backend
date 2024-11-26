"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student_controller");
const router = express_1.default.Router();
// will call controller func
router.get('/:studentId', student_controller_1.StudentController.getSingleStudent);
router.delete('/:studentId', student_controller_1.StudentController.deleteStudent);
router.get('/', student_controller_1.StudentController.getAllStudents);
exports.StudentRoutes = router;
