import {z} from 'zod'

export const SignUpSchemaObject = z.object({
    email: z.string().email('Invalid email address'),
    birthday: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format"
    }),
    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[#%!])/, 'Password must contain uppercase, lowercase, and special characters (#, %, or !)'),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignUpSchemaType = z.infer<typeof SignUpSchemaObject>