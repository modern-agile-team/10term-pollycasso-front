import { createContext, useContext } from 'react';
import type { Socket } from 'socket.io-client';

import type { ChatMessage } from '@/shared/model';

export interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
}

export const SocketContext = createContext<SocketContextProps | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('Socket Context Not Found');
  }

  return context;
};
