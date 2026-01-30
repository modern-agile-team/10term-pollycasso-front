import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Socket } from 'socket.io-client';
import { useAuthStore } from '@/entities/user';
import { getGameSocket } from './gameSocketInstance';

interface GameSocketContextProps {
  gameSocket: Socket | null;
  isGameConnected: boolean;
}

const GameSocketContext = createContext<GameSocketContextProps | null>(null);

export const GameSocketProvider = ({ children }: { children: ReactNode }) => {
  const gameSocket = getGameSocket();

  const [isGameConnected, setIsGameConnected] = useState(gameSocket.connected);

  // 리액트 상태 구독용 (변경 감지용)
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!token || !gameSocket) return;

    gameSocket.auth = { token };

    const handleConnect = () => setIsGameConnected(true);
    const handleDisconnect = () => setIsGameConnected(false);

    gameSocket.on('connect', handleConnect);
    gameSocket.on('disconnect', handleDisconnect);

    if (!gameSocket.connected) {
      gameSocket.connect();
    }

    return () => {
      gameSocket.off('connect', handleConnect);
      gameSocket.off('disconnect', handleDisconnect);
    };
  }, [token, gameSocket]);

  return (
    <GameSocketContext.Provider value={{ gameSocket, isGameConnected }}>
      {children}
    </GameSocketContext.Provider>
  );
};

export const useGameSocket = () => {
  const context = useContext(GameSocketContext);
  return context || { gameSocket: null, isGameConnected: false };
};
