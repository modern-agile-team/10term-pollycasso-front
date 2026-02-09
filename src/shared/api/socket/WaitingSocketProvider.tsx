import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Socket } from 'socket.io-client';
import { useAuthStore } from '@/entities/user';
import { getWaitingSocket } from './waitingSocketInstance';

interface WaitingSocketContextProps {
  waitingSocket: Socket | null;
  isGameConnected: boolean;
}

const WaitingSocketContext = createContext<WaitingSocketContextProps | null>(
  null,
);

export const WaitingSocketProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const waitingSocket = getWaitingSocket();

  const [isGameConnected, setIsGameConnected] = useState(
    waitingSocket.connected,
  );

  // 리액트 상태 구독용 (변경 감지용)
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!token || !waitingSocket) return;

    waitingSocket.auth = { token };

    const handleConnect = () => setIsGameConnected(true);
    const handleDisconnect = () => setIsGameConnected(false);

    waitingSocket.on('connect', handleConnect);
    waitingSocket.on('disconnect', handleDisconnect);

    if (!waitingSocket.connected) {
      waitingSocket.connect();
    }

    return () => {
      waitingSocket.off('connect', handleConnect);
      waitingSocket.off('disconnect', handleDisconnect);
    };
  }, [token, waitingSocket]);

  return (
    <WaitingSocketContext.Provider value={{ waitingSocket, isGameConnected }}>
      {children}
    </WaitingSocketContext.Provider>
  );
};

export const useWaitingSocket = () => {
  const context = useContext(WaitingSocketContext);
  return context || { waitingSocket: null, isGameConnected: false };
};
