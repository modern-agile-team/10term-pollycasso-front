import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { overlay } from 'overlay-kit';
import { getGameSocket } from '@/shared/api/socket';
import { NudgeModal } from '@/features/lobby';

export const useNudgeListener = () => {
  const gameSocket = getGameSocket();

  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    if (!gameSocket) return;

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

    gameSocket.on('room:nudged', handleNudge);

    return () => {
      gameSocket.off('room:nudged', handleNudge);
    };
  }, [gameSocket, roomId, navigate]);
};
