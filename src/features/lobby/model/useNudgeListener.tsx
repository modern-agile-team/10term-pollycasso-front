import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { overlay } from 'overlay-kit';
import { getWaitingSocket } from '@/shared/api/socket';
import { NudgeModal } from '@/features/lobby';

export const useNudgeListener = () => {
  const waitingSocket = getWaitingSocket();

  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    if (!waitingSocket) return;

    const handleNudge = ({ senderId }: { senderId: string }) => {
      overlay.open(({ unmount }) => {
        return (
          <NudgeModal
            close={() => unmount()}
            onConfirm={() => {
              if (roomId) {
                navigate(`/rooms/${roomId}`);
              }
            }}
          />
        );
      });
    };

    waitingSocket.on('room:nudged', handleNudge);

    return () => {
      waitingSocket.off('room:nudged', handleNudge);
    };
  }, [waitingSocket, roomId, navigate]);
};
