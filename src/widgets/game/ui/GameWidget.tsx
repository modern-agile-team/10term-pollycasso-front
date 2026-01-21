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

import { SOCKET_EVENTS, useSocket } from '@/shared/api/socket';
import { PHASE_TIME } from '@/shared/model';
import { useGameState } from '../model/useGameState';
import { useGameSubmission } from '../model/useGameSubmission';
import { useThemeInput } from '../model/useThemeInput';
import { useThemeSelecting } from '../model/useThemeSelecting';
import { EvaluatingPhase } from '@/features/game-evaluating/ui/EvaluatingPhase';

const TestWidget = () => {
  // 변경 코드 (status를 realStatus로 이름 바꿔서 받아오고, status 변수를 새로 정의)
  const {
    status: realStatus,
    players,
    endsAt,
    inventory,
    currentTheme,
  } = useGameState();

  // 🚧 [DEV] UI 개발용 강제 상태 고정 (커밋 절대 금지 ❌)
  const status = 'EVALUATING';

  const { socket } = useSocket();
  const { user } = useAuthStore();

  const { completedCount, totalCount, isMeReady, toggleReady } =
    useGameSubmission();

  const { isMyTurn } = useThemeSelecting();
  const { localInput, handleInputChange, handleRandomTheme } =
    useThemeInput(isMyTurn);

  const handleComplete = useCallback(() => {
    if (status === 'THEME_SELECTING') {
      if (!isMyTurn) return;
      if (!localInput.trim()) {
        alert('주제를 입력해주세요!');
        return;
      }
      socket?.emit(SOCKET_EVENTS.GAME_THEME_SUBMIT, { theme: localInput });
      return;
    }
    toggleReady();
  }, [status, isMyTurn, localInput, socket, toggleReady]);

  const totalTime = useMemo(() => {
    switch (status) {
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
  }, [status]);

  const renderGameContent = () => {
    switch (status) {
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
        return <div className="text-2xl font-bold">라운드 결과 집계 중...</div>;

      case 'FINISHED':
        return <div className="text-2xl font-bold">게임 종료! 결과 발표</div>;

      default:
        return <div className="text-gray-400">로딩 중...</div>;
    }
  };

  return (
    <div className="w-full h-screen flex justify-between items-center font-ssrm px-20 py-4 overflow-hidden gap-16">
      <PlayerSidebar players={players} currentUserId={user?.id} />

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
          showBadge={status !== 'THEME_SELECTING'}
        />
      </aside>
    </div>
  );
};

export default TestWidget;
