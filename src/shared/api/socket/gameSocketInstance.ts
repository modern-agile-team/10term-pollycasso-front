import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getGameSocket = (token?: string): Socket => {
  if (!socket) {
    socket = io(`${import.meta.env.VITE_SOCKET_URL}/waiting`, {
      transports: ['websocket'],
      autoConnect: false,
      auth: { token },
    });
  }

  if (token && socket.auth) {
    (socket.auth as any).token = token;
  }

  return socket;
};
