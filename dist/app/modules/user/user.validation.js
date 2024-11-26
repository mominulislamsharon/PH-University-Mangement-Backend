"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    id: zod_1.z.string({
        invalid_type_error: "password must be string",
    }),
    password: zod_1.z.string().max(20, { message: 'password cannot be less than 20 characters' }).optional(),
});
exports.userValidation = {
    userValidationSchema,
};
