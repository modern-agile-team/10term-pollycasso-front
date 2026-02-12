import { useCallback, useMemo } from 'react';

import { useAuthStore } from '@/entities/user';
import {
  GameHeader,
  GameSubmitButton,
  GameTimer,
  InventoryPanel,
  PlayerSidebar,
  ThemeSelector,
} from '@/features/game';
import { DrawingPhase } from '@/features/game-drawing';
import { EvaluatingPhase } from '@/features/game-evaluating';
import { RoundSummaryPhase } from '@/features/game-round-summary';
import { FinishedPhase } from '@/features/game-finished';
import { PHASE_TIME } from '@/shared/model';
import type { PhaseContext, RoomStatus } from '@/shared/model';
import { useGameState } from '../model/useGameState';
import { useGameSubmission } from '../model/useGameSubmission';
import { useThemeInput } from '../model/useThemeInput';
import { useThemeSelecting } from '../model/useThemeSelecting';
import { useGameSocket } from '@/shared/api/socket/GameSocketProvider';
import { SOCKET_EVENTS } from '@/shared/api/socket';

interface GameWidgetProps {
  phase: RoomStatus;
  endsAt: number | null;
  phaseContext: PhaseContext | null;
  playerMap: Record<string, number>;
}

const GameWidget = ({
  phase,
  endsAt,
  phaseContext,
  playerMap,
}: GameWidgetProps) => {
  const { players, inventory, currentTheme } = useGameState();
  const { gameSocket } = useGameSocket();
  const { user } = useAuthStore();

  const { completedCount, totalCount, isMeReady, toggleReady } =
    useGameSubmission();

  const syncedPlayers = useMemo(() => {
    if (!players) return [];

    return players.map((player) => ({
      ...player,
      // playerMap에 내 userId(문자열)가 있으면 해당 roomMemberId를 꽂아줌
      roomMemberId: playerMap[player.userId] || null,
    }));
  }, [players, playerMap]);

  const isMyTurn = useMemo(() => {
    return (
      phaseContext?.kind === 'THEME_SELECTING' &&
      phaseContext.selectorId === Number(user?.id)
    );
  }, [phaseContext, user]);

  const { localInput, handleInputChange, handleRandomTheme } =
    useThemeInput(isMyTurn);

  const handleComplete = useCallback(() => {
    if (phase === 'THEME_SELECTING') {
      if (!isMyTurn) return;
      if (!localInput.trim()) {
        alert('주제를 입력해주세요!');
        return;
      }
      gameSocket?.emit(SOCKET_EVENTS.GAME_FINALIZE, { value: localInput });
      return;
    }
    toggleReady();
  }, [phase, isMyTurn, localInput, gameSocket, toggleReady]);

  const totalTime = useMemo(() => {
    switch (phase) {
      case 'THEME_SELECTING':
        return PHASE_TIME.THEME_SELECT;
      case 'DRAWING':
        return PHASE_TIME.DRAWING;
      case 'EVALUATING':
        return PHASE_TIME.EVALUATING;
      case 'ROUND_SUMMARY':
        return PHASE_TIME.ROUND_SUMMARY;
      case 'FINISHED':
        return PHASE_TIME.FINISHED;
      default:
        return PHASE_TIME.DEFAULT;
    }
  }, [phase]);

  const renderGameContent = () => {
    switch (phase) {
      case 'THEME_SELECTING':
        return (
          <ThemeSelector
            isSelector={isMyTurn}
            inputValue={localInput}
            onChange={handleInputChange}
            onRandom={handleRandomTheme}
          />
        );

      case 'DRAWING':
        return <DrawingPhase />;

      case 'EVALUATING':
        return <EvaluatingPhase />;

      case 'ROUND_SUMMARY':
        return <RoundSummaryPhase />;

      case 'FINISHED':
        return <FinishedPhase />;

      default:
        return <div className="text-gray-400">로딩 중...</div>;
    }
  };

  return (
    <div className="w-full h-screen flex justify-between items-center font-ssrm px-20 py-4 overflow-hidden gap-16">
      <PlayerSidebar players={syncedPlayers} currentUserId={user?.id || ''} />

      <main className="w-full h-full rounded-3xl bg-white shadow-xl flex flex-col relative overflow-hidden">
        <GameTimer
          endsAt={endsAt}
          totalTime={totalTime}
          className="absolute top-24 right-16 z-10"
        />

        <GameHeader currentTheme={currentTheme} />

        <div className="flex-1 flex justify-center bg-white pt-0 items-start relative">
          {renderGameContent()}
        </div>
      </main>

      <aside className="h-full flex flex-col justify-center gap-y-20">
        <InventoryPanel inventory={inventory} />
        <GameSubmitButton
          onComplete={handleComplete}
          completedCount={completedCount}
          totalCount={totalCount}
          isReady={isMeReady}
          showBadge={phase !== 'THEME_SELECTING'}
        />
      </aside>
    </div>
  );
};

export default GameWidget;
