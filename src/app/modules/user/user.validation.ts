import { z } from 'zod';
import { UserStatus } from './user.constant';

const userValidationSchema = z.object({
  id: z.string({
    invalid_type_error: 'password must be string',
  }),
  password: z
    .string()
    .max(20, { message: 'password cannot be less than 20 characters' })
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const userValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
