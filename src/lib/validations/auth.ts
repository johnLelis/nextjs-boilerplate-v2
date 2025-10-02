import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 🔑 Schemas
const loginSchema = z.object({
  email: z.email('Please enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(255),
    email: z.email('Please enter a valid email.'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    //Uncomment for production use
    // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .regex(/[0-9]/, 'Password must contain at least one number')
    // .regex(
    //   /[^A-Za-z0-9]/,
    //   'Password must contain at least one special character'
    // ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email.'),
});

const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const updateProfileSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  email: z.email().optional(),
  image: z.url().optional(),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z
      .string()
      .min(8)
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// 🔑 Types
type LoginInput = z.infer<typeof loginSchema>;
type RegisterInput = z.infer<typeof registerSchema>;
type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// 🔑 Resolvers (ready to plug into useForm)
const loginResolver = zodResolver(loginSchema);
const registerResolver = zodResolver(registerSchema);
const forgotPasswordResolver = zodResolver(forgotPasswordSchema);
const resetPasswordResolver = zodResolver(resetPasswordSchema);
const updateProfileResolver = zodResolver(updateProfileSchema);
const changePasswordResolver = zodResolver(changePasswordSchema);

export {
  type LoginInput,
  type RegisterInput,
  type ForgotPasswordInput,
  type ResetPasswordInput,
  type UpdateProfileInput,
  type ChangePasswordInput,
  loginResolver,
  registerResolver,
  forgotPasswordResolver,
  resetPasswordResolver,
  updateProfileResolver,
  changePasswordResolver,
};
