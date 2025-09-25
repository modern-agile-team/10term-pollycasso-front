import { z } from 'zod';

const USERNAME_MESSAGE =
  '아이디는 5~20자 이내의 영어 소문자(a-z), 숫자(0-9), 특수문자(_, -)로 구성되어야 합니다.' as const;
const NICKNAME_MESSAGE =
  '닉네임은 한글 포함 시 10자 이내, 영문/숫자 30자 이내로 구성되어야 합니다.' as const;
const PASSWORD_MESSAGE =
  '비밀번호는 8~20자 이내의 영문자, 숫자, 특수문자로 구성되어야 합니다.' as const;
const CONFIRM_MESSAGE = '비밀번호가 일치하지 않습니다.' as const;

export const usernameSchema = z
  .string()
  .min(5, USERNAME_MESSAGE)
  .max(20, USERNAME_MESSAGE)
  .regex(/^[a-z0-9_-]+$/, USERNAME_MESSAGE);

export const nicknameSchema = z
  .string()
  .regex(/^[가-힣a-zA-Z0-9]+$/, NICKNAME_MESSAGE)
  .refine(
    (val) => (/[가-힣]/.test(val) ? val.length <= 10 : val.length <= 30),
    { message: NICKNAME_MESSAGE },
  );

export const passwordSchema = z
  .string()
  .min(8, PASSWORD_MESSAGE)
  .max(20, PASSWORD_MESSAGE)
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,20}$/, PASSWORD_MESSAGE);

export const signUpSchema = z
  .object({
    username: usernameSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: CONFIRM_MESSAGE,
  });

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
