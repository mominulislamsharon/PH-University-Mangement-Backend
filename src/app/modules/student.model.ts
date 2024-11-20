import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian as TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student/student.interface';

import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstname: {
    type: String,
    required: [true, 'First name is required. Please provide the first name.'],
    trim: true,
    maxlength: [
      20,
      'First Name can not be more than allowed length  is 20 characters',
    ],
    validate: {
      validator: function (value: string) {
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
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required. Please provide a unique ID.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required. Please provide a password.'],
      minlength: [20, 'Password must be at least 8 characters long.'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required. Please provide a valid name.'],
    },
    gender: {
      type: String,
      enum: {
        values: ['female', 'male', 'other'],
        message:
          '{VALUE} is not a valid gender. Valid options are "female", "male", or "other".',
      },
      required: [true, 'Gender is required. Please specify the gender.'],
    },
    dateOfBirth: {
      type: String,
      required: [
        true,
        'Date of birth is required. Please provide the date of birth.',
      ],
    },
    email: {
      type: String,
      required: [
        true,
        'Email is required. Please provide a valid email address.',
      ],
      unique: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: '{VALUE} is not a valid email address.',
      // }
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
        message:
          '{VALUE} is not a valid blood group. Valid options are A+, A-, B+, B-, AB+, AB-, O+, O-.',
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
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message:
          '{VALUE} is not valid. Valid options are "active" or "blocked".',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstname} ${this.name.middlename} ${this.name.lastname}`;
});

// pre save middleware / hook : will work on create() save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
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

// [{$match: {isDeleted: {$ne: : true}}, {$match: {id: 'S12354588152'}}]

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string){
//   const existingUser = await Student.findOne({id});

//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
