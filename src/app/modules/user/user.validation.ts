import { z } from "zod";

const userValidationSchema = z.object({
  id: z.string({
    invalid_type_error: "password must be string",
  }),
  password: z.string().max(20, {message: 'password cannot be less than 20 characters'}).optional(),
})

export const userValidation = {
  userValidationSchema,
}