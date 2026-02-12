import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Socket } from 'socket.io-client';
import { useAuthStore } from '@/entities/user';
import { getGameSocket } from './gameSocketInstance';

interface GameSocketContextProps {
  gameSocket: Socket | null;
  isFriendConnected: boolean;
}

const GameSocketContext = createContext<GameSocketContextProps | null>(null);

export const GameSocketProvider = ({ children }: { children: ReactNode }) => {
  const gameSocket = getGameSocket();

  const [isFriendConnected, setIsFriendConnected] = useState(
    gameSocket.connected,
  );

  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!token || !gameSocket) return;

    gameSocket.auth = { token };

    const handleConnect = () => setIsFriendConnected(true);
    const handleDisconnect = () => setIsFriendConnected(false);

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
    <GameSocketContext.Provider value={{ gameSocket, isFriendConnected }}>
      {children}
    </GameSocketContext.Provider>
  );
};

export const useGameSocket = () => {
  const context = useContext(GameSocketContext);
  return context || { gameSocket: null, isFriendConnected: false };
};
