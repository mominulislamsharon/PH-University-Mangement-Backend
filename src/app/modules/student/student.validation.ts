import { z } from 'zod';

const userNameValidaionSchema = z.object({
  firstname: z
    .string()
    .trim()
    .max(20, 'First Name can not be more than 20 characters'),
  middlename: z.string().optional(),
  lastname: z
    .string().min(1),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const localguardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const studentValidaionSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameValidaionSchema,
  gender: z.enum(['female', 'male', 'other']),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email('Invalid email address'),
  contactNumber: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodGroup: z.enum(
    ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  ),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localguardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidaionSchema;