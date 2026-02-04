import { useAuthStore } from '@/entities/user';
import { io, Socket } from 'socket.io-client';

let chatSocket: Socket | null = null;

export const getChatSocket = (): Socket => {
  const token = useAuthStore.getState().accessToken;

  if (!chatSocket) {
    chatSocket = io(`${import.meta.env.VITE_SOCKET_URL}/chat`, {
      transports: ['websocket'],
      autoConnect: false,
      auth: { token },
    });
  }

  if (chatSocket) {
    chatSocket.auth = { token };
  }

  return chatSocket;
};
