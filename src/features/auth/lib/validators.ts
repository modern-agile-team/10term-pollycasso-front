import { z } from 'zod';

import { AUTH_MESSAGES } from '../constants/messages';

export const usernameSchema = z
  .string()
  .min(5, AUTH_MESSAGES.USERNAME_FORMAT)
  .max(20, AUTH_MESSAGES.USERNAME_FORMAT)
  .regex(/^[a-z0-9_-]+$/, AUTH_MESSAGES.USERNAME_FORMAT);

export const nicknameSchema = z
  .string()
  .regex(/^[가-힣a-zA-Z0-9]+$/, AUTH_MESSAGES.NICKNAME_FORMAT)
  .refine(
    (val) => (/[가-힣]/.test(val) ? val.length <= 10 : val.length <= 30),
    { message: AUTH_MESSAGES.NICKNAME_FORMAT },
  );

export const passwordSchema = z
  .string()
  .min(8, AUTH_MESSAGES.PASSWORD_FORMAT)
  .max(20, AUTH_MESSAGES.PASSWORD_FORMAT)
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,20}$/,
    AUTH_MESSAGES.PASSWORD_FORMAT,
  );

export const signUpSchema = z
  .object({
    username: usernameSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: AUTH_MESSAGES.CONFIRM_PASSWORD_MISMATCH,
  });

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type SignupFormValues = z.infer<typeof signUpSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
