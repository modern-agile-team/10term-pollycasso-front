import { useEffect, useState } from 'react';

import type { Player } from '@/entities/game';
import { useGameDrawing } from './useGameDrawing';

interface GameSubmissionState {
  players: Player[];
  isMeReady: boolean;
  completedCount: number;
  totalCount: number;
  toggleReady: () => void;
}

export const useGameSubmission = (): GameSubmissionState => {
  const { players: initialPlayers } = useGameDrawing();

  const MOCK_ID = 'id-2';

  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  useEffect(() => {
    if (initialPlayers && initialPlayers.length > 0) {
      setPlayers(initialPlayers);
    }
  }, [initialPlayers]);

  const totalCount = players.length;
  const completedCount = players.filter((p) => p.isReady).length;

  const myPlayer = players.find((p) => p.userId === MOCK_ID);

  const isMeReady = myPlayer?.isReady ?? false;

  const toggleReady = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.userId === MOCK_ID ? { ...p, isReady: !p.isReady } : p,
      ),
    );
  };

  return {
    players,
    isMeReady,
    completedCount,
    totalCount,
    toggleReady,
  };
};
