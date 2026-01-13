import { useCallback, useEffect, useState } from 'react';

import { SOCKET_EVENTS, useSocket } from '@/shared/api/socket';
import { RANDOM_THEMES } from '@/shared/model';

export const useThemeInput = (isMyTurn: boolean) => {
  const { socket } = useSocket();
  const [localInput, setLocalInput] = useState('');

  const handleInputChange = useCallback(
    (value: string) => {
      setLocalInput(value);
      if (isMyTurn) {
        socket?.emit(SOCKET_EVENTS.GAME_TYPING, { value });
      }
    },
    [isMyTurn, socket],
  );

  const handleRandomTheme = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * RANDOM_THEMES.length);
    const randomTheme = RANDOM_THEMES[randomIndex];

    setLocalInput(randomTheme);
    if (socket) {
      socket.emit(SOCKET_EVENTS.GAME_TYPING, { value: randomTheme });
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleTypingShare = (data: { value: string }) => {
      if (!isMyTurn) {
        setLocalInput(data.value);
      }
    };

    socket.on(SOCKET_EVENTS.GAME_TYPING_SHARE, handleTypingShare);
    return () => {
      socket.off(SOCKET_EVENTS.GAME_TYPING_SHARE, handleTypingShare);
    };
  }, [socket, isMyTurn]);

  return {
    localInput,
    handleInputChange,
    handleRandomTheme,
  };
};
