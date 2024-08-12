// schemas/signInSchema.ts
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export const ResetPaswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type ResetPassworSchemaType = z.infer<typeof ResetPaswordSchema>;