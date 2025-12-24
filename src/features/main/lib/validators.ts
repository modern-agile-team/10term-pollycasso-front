import { z } from 'zod';

import {
  PRIVATE_ROOM,
  ROOM_MODE,
  ROOM_TITLE,
  ROOM_TITLE_MESSAGE,
  SOLO_PLAYER_RANGE,
  TEAM_PLAYER_OPTIONS,
} from '../constants/roomSettings';

export const RoomModeEnum = z.enum([ROOM_MODE.SOLO, ROOM_MODE.TEAM]);

export const createRoomSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(ROOM_TITLE.MIN, ROOM_TITLE_MESSAGE.REQUIRED)
      .max(ROOM_TITLE.MAX, ROOM_TITLE_MESSAGE.TOO_LONG),
    mode: RoomModeEnum,
    maxPlayers: z.number(),
    isPrivate: z.boolean(),
    password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isPrivate) {
      if (!data.password || !PRIVATE_ROOM.PASSWORD_REGEX.test(data.password)) {
        ctx.addIssue({
          code: 'custom',
          path: ['password'],
          message: PRIVATE_ROOM.ERROR_MESSAGE,
        });
      }
    }

    if (data.mode === ROOM_MODE.SOLO) {
      if (
        data.maxPlayers < SOLO_PLAYER_RANGE.MIN ||
        data.maxPlayers > SOLO_PLAYER_RANGE.MAX
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['maxPlayers'],
          message: `개인전 인원은 ${SOLO_PLAYER_RANGE.MIN}명에서 ${SOLO_PLAYER_RANGE.MAX}명까지만 선택 가능합니다.`,
        });
      }
    }

    if (data.mode === ROOM_MODE.TEAM) {
      if (!TEAM_PLAYER_OPTIONS.includes(data.maxPlayers as any)) {
        ctx.addIssue({
          code: 'custom',
          path: ['maxPlayers'],
          message: `팀전 인원은 ${TEAM_PLAYER_OPTIONS.join('명 또는 ')}명만 선택 가능합니다.`,
        });
      }
    }
  });

export type CreateRoomForm = z.infer<typeof createRoomSchema>;
