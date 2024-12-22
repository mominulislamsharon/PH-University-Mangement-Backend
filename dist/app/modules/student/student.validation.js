"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidaions = exports.updateStudentValidationSchema = exports.createStudentValidaionSchema = void 0;
const zod_1 = require("zod");
const userNameValidationSchema = zod_1.z.object({
    firstname: zod_1.z
        .string()
        .trim()
        .max(20, 'First Name can not be more than 20 characters'),
    middlename: zod_1.z.string().optional(),
    lastname: zod_1.z.string().min(1),
});
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1),
    fatherOccupation: zod_1.z.string().min(1),
    fatherContactNo: zod_1.z.string().min(1),
    motherName: zod_1.z.string().min(1),
    motherOccupation: zod_1.z.string().min(1),
    motherContactNo: zod_1.z.string().min(1),
});
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    occupation: zod_1.z.string().min(1),
    contactNo: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
});
exports.createStudentValidaionSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        student: zod_1.z.object({
            name: userNameValidationSchema,
            gender: zod_1.z.enum(['female', 'male', 'other']),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email('Invalid email address'),
            contactNumber: zod_1.z.string().min(1),
            emergencyContactNo: zod_1.z.string().min(1),
            bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            presentAddress: zod_1.z.string().min(1),
            permanentAddress: zod_1.z.string().min(1),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            profileImg: zod_1.z.string().optional(),
            admissionSemester: zod_1.z.string(),
            academicDepartment: zod_1.z.string(),
        }),
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20).optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
const updateGurdianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().optional(),
    fatherOccupation: zod_1.z.string().optional(),
    fatherContactNo: zod_1.z.string().optional(),
    motherName: zod_1.z.string().optional(),
    motherOccupation: zod_1.z.string().optional(),
    motherContactNo: zod_1.z.string().optional(),
});
const updateLocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    occupation: zod_1.z.string().optional(),
    contactNo: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
exports.updateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            name: updateUserNameValidationSchema,
            gender: zod_1.z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().optional(),
            emergencyContactNo: zod_1.z.string().optional(),
            bloogGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: zod_1.z.string().optional(),
            permanentAddress: zod_1.z.string().optional(),
            guardian: updateGurdianValidationSchema.optional(),
            localGuardian: updateLocalGuardianValidationSchema.optional(),
            admissionSemester: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().optional(),
            academicDepartment: zod_1.z.string().optional(),
        }),
    }),
});
exports.studentValidaions = {
    createStudentValidaionSchema: exports.createStudentValidaionSchema,
    updateStudentValidationSchema: exports.updateStudentValidationSchema,
};
