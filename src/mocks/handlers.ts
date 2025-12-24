import { authHandlers } from '@/mocks/auth.mock';
import { chatHandlers } from '@/mocks/chat.mock';
import { roomHandlers } from '@/mocks/room.mock';

export const handlers = [...authHandlers, ...roomHandlers, ...chatHandlers];
