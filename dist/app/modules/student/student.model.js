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
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userNameSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required. Please provide the first name.'],
        trim: true,
        maxlength: [
            20,
            'First Name can not be more than allowed length  is 20 characters',
        ],
        validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not in capitalized format',
        },
    },
    middlename: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, 'Last name is required. Please provide the last name.'],
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: '{VALUE} is not valid',
        },
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: [
            true,
            "Father's name is required. Please provide father's name.",
        ],
    },
    fatherOccupation: {
        type: String,
        required: [
            true,
            "Father's occupation is required. Please provide father's occupation.",
        ],
    },
    fatherContactNo: {
        type: String,
        required: [
            true,
            "Father's contact number is required. Please provide father's contact number.",
        ],
    },
    motherName: {
        type: String,
        required: [
            true,
            "Mother's name is required. Please provide mother's name.",
        ],
    },
    motherOccupation: {
        type: String,
        required: [
            true,
            "Mother's occupation is required. Please provide mother's occupation.",
        ],
    },
    motherContactNo: {
        type: String,
        required: [
            true,
            "Mother's contact number is required. Please provide mother's contact number.",
        ],
    },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [
            true,
            "Local guardian's name is required. Please provide the name of the local guardian.",
        ],
    },
    occupation: {
        type: String,
        required: [
            true,
            "Local guardian's occupation is required. Please provide their occupation.",
        ],
    },
    contactNo: {
        type: String,
        required: [
            true,
            "Local guardian's contact number is required. Please provide their contact number.",
        ],
    },
    address: {
        type: String,
        required: [
            true,
            "Local guardian's address is required. Please provide their address.",
        ],
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Student ID is required. Please provide a unique ID.'],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'user id is required. Please provide'],
        unique: true,
        ref: 'User',
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required. Please provide a valid name.'],
    },
    gender: {
        type: String,
        enum: {
            values: ['female', 'male', 'other'],
            message: '{VALUE} is not a valid gender. Valid options are "female", "male", or "other".',
        },
        required: [true, 'Gender is required. Please specify the gender.'],
    },
    dateOfBirth: {
        type: Date,
    },
    email: {
        type: String,
        required: [
            true,
            'Email is required. Please provide a valid email address.',
        ],
        unique: true,
    },
    contactNumber: {
        type: String,
        required: [
            true,
            'Contact number is required. Please provide a contact number.',
        ],
    },
    emergencyContactNo: {
        type: String,
        required: [
            true,
            'Emergency contact number is required. Please provide an emergency contact number.',
        ],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not a valid blood group. Valid options are A+, A-, B+, B-, AB+, AB-, O+, O-.',
        },
        required: [
            true,
            'Blood group is required. Please specify the blood group.',
        ],
    },
    presentAddress: {
        type: String,
        required: [
            true,
            'Present address is required. Please provide the current address.',
        ],
    },
    permanentAddress: {
        type: String,
        required: [
            true,
            'Permanent address is required. Please provide the permanent address.',
        ],
    },
    guardian: {
        type: guardianSchema,
        required: [
            true,
            'Guardian information is required. Please provide guardian details.',
        ],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [
            true,
            'Local guardian information is required. Please provide details of the local guardian.',
        ],
    },
    profileImg: { type: String },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
// virtual
studentSchema.virtual('fullName').get(function () {
    var _a, _b, _c;
    return `${(_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstname} ${(_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.middlename} ${(_c = this === null || this === void 0 ? void 0 : this.name) === null || _c === void 0 ? void 0 : _c.lastname}`;
});
// Query middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
// creating a custom static method
studentSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Student.findOne({ id });
        return existingUser;
    });
};
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
