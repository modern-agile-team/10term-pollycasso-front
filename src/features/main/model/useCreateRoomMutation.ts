import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { roomQueries } from '@/entities/room/queries/roomQueries';
import { useCreateRoomModalStore } from './useCreateRoomModalStore';
import type { Room } from '@/entities/room/model/types';

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { close } = useCreateRoomModalStore();

  return useMutation({
    ...roomQueries.create(),

    onSuccess: (data: Room) => {
      // 필요한가? (방 목록 갱신)
      queryClient.invalidateQueries({
        queryKey: roomQueries.rooms(),
      });

      // 모달끄기
      close();

      navigate(`/room/${data.id}`);
    },

    onError: (error) => {
      // 에러 토스트 알림 처리 해야함
      console.error(error);
      alert('방 생성에 실패했습니다.');
    },
  });
};
