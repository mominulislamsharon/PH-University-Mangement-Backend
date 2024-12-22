"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRotues = void 0;
const user_controller_1 = require("./user.controller");
const student_validation_1 = require("../student/student.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// parser
router.post('/create-student', (0, validateRequest_1.default)(student_validation_1.createStudentValidaionSchema), user_controller_1.UserController.createStudent);
exports.UserRotues = router;
