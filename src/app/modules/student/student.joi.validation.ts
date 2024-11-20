import Joi from 'Joi';
// Joi schema for the UserName object
const userNameValidationSchema = Joi.object({
  firstname: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, 'Capitalized format')
    .messages({
      'string.empty':
        'First name is required. Please provide the first name.',
      'string.max': 'First Name can not exceed 20 characters.',
      'string.pattern.base': '{#value} is not in capitalized format.',
    }),
  middlename: Joi.string().trim().optional(),
  lastname: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/, 'Alphabetical characters')
    .messages({
      'string.empty':
        'Last name is required. Please provide the last name.',
      'string.pattern.base': '{#value} is not valid.',
    }),
});

// Joi schema for the Guardian object
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty':
      "Father's name is required. Please provide father's name.",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty':
      "Father's occupation is required. Please provide father's occupation.",
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty':
      "Father's contact number is required. Please provide father's contact number.",
  }),
  motherName: Joi.string().required().messages({
    'string.empty':
      "Mother's name is required. Please provide mother's name.",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty':
      "Mother's occupation is required. Please provide mother's occupation.",
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty':
      "Mother's contact number is required. Please provide mother's contact number.",
  }),
});

// Joi schema for the LocalGuardian object
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty':
      "Local guardian's name is required. Please provide the name of the local guardian.",
  }),
  occupation: Joi.string().required().messages({
    'string.empty':
      "Local guardian's occupation is required. Please provide their occupation.",
  }),
  contactNo: Joi.string().required().messages({
    'string.empty':
      "Local guardian's contact number is required. Please provide their contact number.",
  }),
  address: Joi.string().required().messages({
    'string.empty':
      "Local guardian's address is required. Please provide their address.",
  }),
});

// Joi schema for the Student object
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required. Please provide a unique ID.',
  }),
  name: userNameValidationSchema.required(),
  gender: Joi.string()
    .valid('female', 'male', 'other')
    .required()
    .messages({
      'any.only':
        '{#value} is not a valid gender. Valid options are "female", "male", or "other".',
      'string.empty': 'Gender is required. Please specify the gender.',
    }),
  dateOfBirth: Joi.string().required().messages({
    'string.empty':
      'Date of birth is required. Please provide the date of birth.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty':
      'Email is required. Please provide a valid email address.',
    'string.email': '{#value} is not a valid email address.',
  }),
  contactNumber: Joi.string().required().messages({
    'string.empty':
      'Contact number is required. Please provide a contact number.',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty':
      'Emergency contact number is required. Please provide an emergency contact number.',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required()
    .messages({
      'any.only':
        '{#value} is not a valid blood group. Valid options are A+, A-, B+, B-, AB+, AB-, O+, O-.',
      'string.empty':
        'Blood group is required. Please specify the blood group.',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty':
      'Present address is required. Please provide the current address.',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty':
      'Permanent address is required. Please provide the permanent address.',
  }),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().optional(),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .default('active')
    .messages({
      'any.only':
        '{#value} is not valid. Valid options are "active" or "blocked".',
    }),
});

export default studentValidationSchema;