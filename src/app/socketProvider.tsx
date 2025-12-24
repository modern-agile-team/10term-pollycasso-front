import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAuthStore } from '@/entities/user';
import type { Socket } from '@/shared/api/socket';
import { io } from '@/shared/api/socket';
import { SocketContext } from '@/shared/api/socket';
import type { ChatMessage } from '@/shared/model';

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const token = useAuthStore((state) => state.accessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (!token) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setMessages([]);
      setIsConnected(false);
      return;
    }

    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
        auth: { token },
        transports: ['websocket'],
      });
    } else {
      socketRef.current.auth = { token };
      socketRef.current.connect();
    }

    const socket = socketRef.current;

    if (!socket) return;

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleError = (err: any) => {
      if (err === 'Invalid token' || err === 'No token provided') {
        clearAuth();
      }
    };
    const handleMessage = (data: ChatMessage) =>
      setMessages((prev) => {
        const newMessages = [...prev, data];
        return newMessages.length > 100 ? newMessages.slice(-100) : newMessages;
      });

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('error', handleError);
    socket.on('lobby:message', handleMessage);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', handleError);
      socket.off('lobby:message', handleMessage);
    };
  }, [token]);

  const sendMessage = useCallback((messageContent: string) => {
    const socket = socketRef.current;
    if (socket && socket.connected) {
      socket.emit('lobby:send', { message: messageContent });
    }
  }, []);

  const value = useMemo(
    () => ({
      socket: socketRef.current,
      isConnected,
      messages,
      sendMessage,
    }),
    [isConnected, messages, sendMessage],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
