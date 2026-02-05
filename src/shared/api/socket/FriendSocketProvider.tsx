import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Socket } from 'socket.io-client';
import { useAuthStore } from '@/entities/user';
import { getFriendSocket } from './friendSocketInstance';

interface FriendSocketContextProps {
  friendSocket: Socket | null;
  isFriendConnected: boolean;
}

const FriendSocketContext = createContext<FriendSocketContextProps | null>(
  null,
);

export const FriendSocketProvider = ({ children }: { children: ReactNode }) => {
  const friendSocket = getFriendSocket();

  const [isFriendConnected, setIsFriendConnected] = useState(
    friendSocket.connected,
  );

  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!token || !friendSocket) return;

    friendSocket.auth = { token };

    const handleConnect = () => setIsFriendConnected(true);
    const handleDisconnect = () => setIsFriendConnected(false);

    friendSocket.on('connect', handleConnect);
    friendSocket.on('disconnect', handleDisconnect);

    if (!friendSocket.connected) {
      friendSocket.connect();
    }

    return () => {
      friendSocket.off('connect', handleConnect);
      friendSocket.off('disconnect', handleDisconnect);
    };
  }, [token, friendSocket]);

  return (
    <FriendSocketContext.Provider value={{ friendSocket, isFriendConnected }}>
      {children}
    </FriendSocketContext.Provider>
  );
};

export const useFriendSocket = () => {
  const context = useContext(FriendSocketContext);
  return context || { friendSocket: null, isFriendConnected: false };
};
