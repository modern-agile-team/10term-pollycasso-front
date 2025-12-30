import { useEffect } from 'react';

import { useAuthStore } from '@/entities/user';
import { useSocket } from '@/shared/api/socket';

const ITEM_EFFECTS: Record<string, () => void> = {
  ink_splash: () => {
    console.log('🦑 [Effect] 먹물 뿌리기 발동!');
    // TODO: 먹물 이펙트 적용
  },
  blur: () => {
    console.log('🌫️ [Effect] 화면 흐리게 하기 발동!');
    // TODO: 화면 흐리게 하기 이펙트 적용
  },
  bomb: () => {
    console.log('💣 [Effect] 캔버스 폭파 발동!');
    // TODO: 캔버스 폭파 이펙트 적용
  },
};

export const useItemEffect = () => {
  const { socket } = useSocket();
  const myUserId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    if (!socket || !myUserId) return;

    const handleApplyEffect = (payload: {
      itemId: string;
      targetUserId: string;
      duration: number;
    }) => {
      const { itemId, targetUserId } = payload;

      if (targetUserId !== myUserId) return;

      const effectFunc = ITEM_EFFECTS[itemId];

      if (effectFunc) {
        effectFunc();
      }
    };

    socket.on('game:applyEffect', handleApplyEffect);

    return () => {
      socket.off('game:applyEffect', handleApplyEffect);
    };
  }, [socket, myUserId]);
};
