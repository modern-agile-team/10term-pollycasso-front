import { z } from 'zod';

const MESSAGES = {
  NICKNAME_FORMAT:
    '한글/영문/숫자만 가능하며, 한글 10자 또는 영문 30자 이내여야 합니다.',
  PASSWORD_FORMAT: '8~20자 이내, 영문/숫자/특수문자를 모두 포함해야 합니다.',
  TAG_FORMAT: '태그는 4자리 숫자여야 합니다.',
  CURRENT_PW_REQUIRED: '새 비밀번호를 설정하려면 현재 비밀번호를 입력해주세요.',
} as const;

const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,20}$/;
const tagRegex = /^\d{4}$/;

const nicknameSchema = z
  .string()
  .regex(nicknameRegex, MESSAGES.NICKNAME_FORMAT)
  .refine(
    (val) => (/[가-힣]/.test(val) ? val.length <= 10 : val.length <= 30),
    { message: MESSAGES.NICKNAME_FORMAT },
  );

const newPasswordSchema = z
  .string()
  .regex(passwordRegex, MESSAGES.PASSWORD_FORMAT);

const tagSchema = z.string().regex(tagRegex, MESSAGES.TAG_FORMAT);

export const profileUpdateSchema = z
  .object({
    nickname: nicknameSchema,
    tag: tagSchema,

    currentPassword: z.string(),

    newPassword: z.union([newPasswordSchema, z.literal('')]),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword && data.newPassword.length > 0) {
      if (!data.currentPassword || data.currentPassword.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['currentPassword'],
          message: MESSAGES.CURRENT_PW_REQUIRED,
        });
      }
    }
  });

export type ProfileFormValues = z.infer<typeof profileUpdateSchema>;
