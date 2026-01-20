import { useCallback, useMemo } from 'react';

import { useAuthStore } from '@/entities/user';
import { DrawingToolbox, GameCanvas, useDrawing } from '@/features/drawing';
import {
  DrawingHistoryButtons,
  GameHeader,
  GameSubmitButton,
  GameTimer,
  InventoryPanel,
  PlayerSidebar,
  ShortcutGuide,
  ThemeSelector,
} from '@/features/game';
import { SOCKET_EVENTS, useSocket } from '@/shared/api/socket';
import { PHASE_TIME } from '@/shared/model';
import { useDrawingShortcuts } from '../model/useDrawingShortcuts';
import { useDrawingTools } from '../model/useDrawingTools';
import { useGameState } from '../model/useGameState';
import { useGameSubmission } from '../model/useGameSubmission';
import { useThemeInput } from '../model/useThemeInput';
import { useThemeSelecting } from '../model/useThemeSelecting';

const DrawingWidget = () => {
  const { status, players, endsAt, inventory, currentTheme } = useGameState();

  const { socket } = useSocket();

  const { isMyTurn } = useThemeSelecting();

  const { completedCount, totalCount, isMeReady, toggleReady } =
    useGameSubmission();

  const {
    activeTool,
    setActiveTool,
    strokeWidth,
    setStrokeWidth,
    selectedColor,
    setSelectedColor,
  } = useDrawingTools();

  const { lines, undo, redo, handleDown, handleMove, handleUp } = useDrawing({
    tool: activeTool,
    color: selectedColor,
    size: strokeWidth,
  });

  const { localInput, handleInputChange, handleRandomTheme } =
    useThemeInput(isMyTurn);

  useDrawingShortcuts({ setActiveTool, setStrokeWidth });

  const { user } = useAuthStore();

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
        return (
          <>
            <div className="absolute -top-12 left-6 z-30">
              <ShortcutGuide />
            </div>
            <GameCanvas
              activeTool={activeTool}
              strokeWidth={strokeWidth}
              lines={lines}
              onMouseDown={handleDown}
              onMouseMove={handleMove}
              onMouseUp={handleUp}
              readOnly={false}
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
              <DrawingToolbox
                activeTool={activeTool}
                onToolChange={setActiveTool}
                strokeWidth={strokeWidth}
                onWidthChange={setStrokeWidth}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />
              <DrawingHistoryButtons undo={undo} redo={redo} />
            </div>
          </>
        );

      case 'EVALUATING':
        return (
          <>
            {/* TODO: 추후 서버에서 받아온 평가 대상 그림(targetLines)을 lines props에 연결해야 함 */}
            <GameCanvas
              lines={[]} // 현재는 빈 배열 (데이터 연동 시 수정 필요)
              readOnly={true}
            />
            {/* TODO: 평가 UI 컴포넌트 추가 위치 */}
            <div className="absolute bottom-12 z-20 bg-white/90 p-4 rounded-xl shadow-lg">
              평가 UI 준비 중...
            </div>
          </>
        );

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
      <PlayerSidebar players={players} currentUserId={user!.id} />

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

export default DrawingWidget;
