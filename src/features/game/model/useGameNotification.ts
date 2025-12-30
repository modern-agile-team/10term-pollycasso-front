import { useEffect, useState } from 'react';

import { useSocket } from '@/shared/api/socket';
import { UI_TEXT } from '../constants/game';

type NotificationType = 'NORMAL' | 'ATTACK';

export const useGameNotification = () => {
  const { socket } = useSocket();

  const [message, setMessage] = useState<string>(UI_TEXT.NOTICE);
  const [type, setType] = useState<NotificationType>('NORMAL');

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (payload: {
      message: string;
      type?: string;
    }) => {
      setMessage(payload.message);
      setType('ATTACK');

      const timer = setTimeout(() => {
        setMessage(UI_TEXT.NOTICE);
        setType('NORMAL');
      }, 5000);

      return () => clearTimeout(timer);
    };

    socket.on('game:itemNotification', handleNotification);

    return () => {
      socket.off('game:itemNotification', handleNotification);
    };
  }, [socket]);

  return { message, type };
};
