import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useAuthStore } from '@/entities/user';
import type { Socket } from '@/shared/api/socket';
import { io, SocketContext } from '@/shared/api/socket';
import type { ChatMessage } from '@/shared/model';

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [messages] = useState<ChatMessage[]>([]);

  const token = useAuthStore((state) => state.accessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (!token) {
      socketRef.current?.disconnect();
      socketRef.current = null;
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

    const handleBeforeUnload = () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('error', handleError);

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', handleError);

      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [token, clearAuth]);

  const value = useMemo(
    () => ({
      socket: socketRef.current,
      isConnected,
      messages,
    }),
    [isConnected, messages],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
