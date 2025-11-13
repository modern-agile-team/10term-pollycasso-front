import { authHandlers } from '@/mocks/auth.mock';
import { roomHandlers } from '@/mocks/room.mock';
import { chatHandlers } from '@/mocks/chat.mock';

export const handlers = [...authHandlers, ...roomHandlers, ...chatHandlers];
