import { UserRole } from '@prisma/client';
import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const signupZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum([...Object.values(UserRole)] as [string, ...string[]], {
      required_error: 'User role is required',
    }),
    contactNo: z.string({ required_error: 'contactNo is required' }),
    address: z.string({ required_error: 'address is required' }),
    profileImg: z.string({ required_error: 'profileImg is required' }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  signupZodSchema,
};
