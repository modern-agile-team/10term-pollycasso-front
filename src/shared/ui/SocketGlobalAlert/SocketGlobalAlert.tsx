import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useSocket } from '@/shared/api/socket';

interface NotificationPayload {
  status: number;
  code?: string;
  message: string;
}

export const SocketGlobalAlert = () => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (payload: NotificationPayload) => {
      const { status, message } = payload;

      if (status >= 400) {
        toast.error('경고', {
          icon: () => <span className="text-xl">🚨</span>,
        });
      } else if (status === 200) {
        toast.success('성공', {
          icon: () => <span className="text-xl">✅</span>,
        });
      } else {
        toast.info(message);
      }
    };

    socket.on('system:notification', handleNotification);

    return () => {
      socket.off('system:notification', handleNotification);
    };
  }, [socket]);

  return null;
};
