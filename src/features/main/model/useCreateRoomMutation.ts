import { useMutation, useQueryClient } from '@tanstack/react-query';

import { roomQueries } from '@/entities/room';

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...roomQueries.create(),

    onSuccess: () => {
      // (방 목록 갱신)
      queryClient.invalidateQueries({
        queryKey: roomQueries.rooms(),
      });
    },
  });
};
