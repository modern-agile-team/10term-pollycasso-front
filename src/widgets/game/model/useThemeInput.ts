import { useCallback, useEffect, useState } from 'react';

import { RANDOM_THEMES } from '@/shared/model';
import { useGameSocket } from '@/shared/api/socket/GameSocketProvider';
import { SOCKET_EVENTS } from '@/shared/api/socket';

export const useThemeInput = (isMyTurn: boolean) => {
  const { gameSocket } = useGameSocket();
  const [localInput, setLocalInput] = useState('');

  const handleInputChange = useCallback(
    (value: string) => {
      setLocalInput(value);
      if (isMyTurn) {
        gameSocket?.emit(SOCKET_EVENTS.GAME_TYPING, { value });
      }
    },
    [isMyTurn, gameSocket],
  );

  const handleRandomTheme = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * RANDOM_THEMES.length);
    const randomTheme = RANDOM_THEMES[randomIndex];

    setLocalInput(randomTheme);
    if (gameSocket) {
      gameSocket.emit(SOCKET_EVENTS.GAME_TYPING, { value: randomTheme });
    }
  }, [gameSocket]);

  useEffect(() => {
    if (!gameSocket) return;

    const handleTypingShare = (data: { value: string }) => {
      if (!isMyTurn) {
        setLocalInput(data.value);
      }
    };

    gameSocket.on(SOCKET_EVENTS.GAME_TYPING_SHARE, handleTypingShare);
    return () => {
      gameSocket.off(SOCKET_EVENTS.GAME_TYPING_SHARE, handleTypingShare);
    };
  }, [gameSocket, isMyTurn]);

  return {
    localInput,
    handleInputChange,
    handleRandomTheme,
  };
};
