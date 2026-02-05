import { useAuthStore } from '@/entities/user';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getFriendSocket = (): Socket => {
  const token = useAuthStore.getState().accessToken;

  if (!socket) {
    socket = io(`${import.meta.env.VITE_SOCKET_URL}/friends`, {
      transports: ['websocket'],
      autoConnect: false,
      auth: { token },
    });
  }

  if (socket) {
    socket.auth = { token };
  }

  return socket;
};
