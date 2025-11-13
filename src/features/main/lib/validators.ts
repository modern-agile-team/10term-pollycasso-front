import { z } from 'zod';

export const RoomModeEnum = z.enum(['SOLO', 'TEAM']);

export const createRoomSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, '방 제목을 입력해주세요.')
      .max(15, '최대 15자까지 입력 가능합니다.'),
    mode: RoomModeEnum,
    maxPlayers: z.number(),
    isPrivate: z.boolean(),
    password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isPrivate) {
      if (!data.password || !/^\d{4}$/.test(data.password)) {
        ctx.addIssue({
          code: 'custom',
          path: ['password'],
          message: '비공개 방은 4자리 숫자 비밀번호가 필요합니다.',
        });
      }
    }
  });

export type CreateRoomForm = z.infer<typeof createRoomSchema>;
