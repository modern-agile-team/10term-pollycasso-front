import type { ChatMessage } from '@/entities/chat';
import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
}

const SocketContext = createContext<SocketContextProps | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('Socket Context Not Found');
  }

  return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const token = useAuthStore((state) => state.accessToken);
  // TODO: 토큰 만료 시 강제 로그아웃
  // const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (!token) {
      return;
    }

    const socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {
        token: token,
      },
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      console.log('Socket Connected:', socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('Socket Disconnected:', reason);
      setIsConnected(false);
    });

    socketInstance.on('error', (err: any) => {
      console.error('Socket Error:', err);
      if (err === 'Invalid token' || err === 'No token provided') {
        // TODO: clearAuth();
      }
    });

    socketInstance.on('lobby:message', (data: ChatMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, [token]);

  const sendMessage = (messageContent: string) => {
    if (socket && isConnected) {
      socket.emit('lobby:send', { message: messageContent });
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, messages, sendMessage }}
    >
      {children}
    </SocketContext.Provider>
  );
};
