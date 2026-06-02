import { roleListSchema } from '@/features/base-modules/role/data/schema';

import z from 'zod';
import { userSchema } from '../../user/data/schema';


export const userSchemaWithRole = userSchema.extend({
    roles: roleListSchema.optional(),
});

export type UserWithRole = z.infer<typeof userSchemaWithRole>;

export const authRequestSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export type AuthRequest = z.infer<typeof authRequestSchema>;

export const authResponseSchema = z.object({
    success: z.boolean(),
    accessToken: z.string(),
    tokenType: z.string(),
    expiresOn: z.coerce.date(),
    refreshToken: z.string().optional(),
    message: z.string().optional(),
    user: userSchemaWithRole.optional(),
});
export type AuthResponse = z.infer<typeof authResponseSchema>;

export const signupFormSchema = z.object({
  name: z.string().min(1, { message: 'Please enter your name' }),
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
  password_confirmation: z.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;

