import {z} from 'zod'

export const CreateNewPasswordSchema = z.object({

    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[#%!])/, 'Password must contain uppercase, lowercase, and special characters (#, %, or !)'),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type CreateNewPasswordSchemaType = z.infer<typeof CreateNewPasswordSchema>