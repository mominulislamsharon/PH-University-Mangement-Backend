"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userNameValidaionSchema = zod_1.z.object({
    firstname: zod_1.z
        .string()
        .trim()
        .max(20, 'First Name can not be more than 20 characters'),
    middlename: zod_1.z.string().optional(),
    lastname: zod_1.z
        .string().min(1),
});
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1),
    fatherOccupation: zod_1.z.string().min(1),
    fatherContactNo: zod_1.z.string().min(1),
    motherName: zod_1.z.string().min(1),
    motherOccupation: zod_1.z.string().min(1),
    motherContactNo: zod_1.z.string().min(1),
});
const localguardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    occupation: zod_1.z.string().min(1),
    contactNo: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
});
const studentValidaionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    password: zod_1.z.string().max(20),
    name: userNameValidaionSchema,
    gender: zod_1.z.enum(['female', 'male', 'other']),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z
        .string()
        .email('Invalid email address'),
    contactNumber: zod_1.z.string().min(1),
    emergencyContactNo: zod_1.z.string().min(1),
    bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: zod_1.z.string().min(1),
    permanentAddress: zod_1.z.string().min(1),
    guardian: guardianValidationSchema,
    localGuardian: localguardianValidationSchema,
    profileImg: zod_1.z.string().optional(),
    isActive: zod_1.z.enum(['active', 'blocked']).default('active'),
    isDeleted: zod_1.z.boolean(),
});
exports.default = studentValidaionSchema;
