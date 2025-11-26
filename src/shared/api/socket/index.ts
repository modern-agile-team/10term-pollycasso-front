import { io, Socket } from 'socket.io-client';
import { MockSocket } from './mockSocket';

let socketInstance: Socket | MockSocket | null = null;

export const getSocket = () => {
  if (socketInstance) return socketInstance;

  const useMock = import.meta.env.VITE_USE_MOCK === 'true';

  if (useMock) {
    console.log('MOCK 소켓 사용');
    socketInstance = new MockSocket();
  } else {
    socketInstance = io(
      import.meta.env.VITE_API_URL || 'http://localhost:3000',
      {
        transports: ['websocket'],
      },
    );
  }

  return socketInstance;
};
