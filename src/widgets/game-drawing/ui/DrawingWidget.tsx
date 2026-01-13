import { useCallback, useMemo } from 'react';

import { DrawingToolbox, GameCanvas } from '@/features/drawing';
import {
  GameHeader,
  GameSubmitButton,
  GameTimer,
  InventoryPanel,
  PlayerSidebar,
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

  const { localInput, handleInputChange, handleRandomTheme } =
    useThemeInput(isMyTurn);

  useDrawingShortcuts({ setActiveTool, setStrokeWidth });

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

  const isThemeSelecting = false;

  return (
    <div className="w-full h-screen flex justify-between items-center font-ssrm px-20 py-4 overflow-hidden gap-16">
      <PlayerSidebar players={players} />

      <main className="w-full h-full rounded-3xl bg-white shadow-xl flex flex-col relative overflow-hidden">
        <GameTimer
          endsAt={endsAt}
          totalTime={totalTime}
          className="absolute top-24 right-16 z-10"
        />

        <GameHeader currentTheme={currentTheme} />

        <div className="flex-1 flex justify-center bg-white pt-0 items-start relative">
          {isThemeSelecting ? (
            <ThemeSelector
              isSelector={isMyTurn}
              inputValue={localInput}
              onChange={handleInputChange}
              onRandom={handleRandomTheme}
            />
          ) : (
            <>
              <GameCanvas
                activeTool={activeTool}
                strokeWidth={strokeWidth}
                selectedColor={selectedColor}
              />

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <DrawingToolbox
                  activeTool={activeTool}
                  onToolChange={setActiveTool}
                  strokeWidth={strokeWidth}
                  onWidthChange={setStrokeWidth}
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
              </div>
            </>
          )}
        </div>
      </main>

      <aside className="h-full flex flex-col justify-center gap-y-20">
        <InventoryPanel inventory={inventory} />
        <GameSubmitButton
          onComplete={handleComplete}
          completedCount={completedCount}
          totalCount={totalCount}
          isReady={isMeReady}
          showBadge={!isThemeSelecting}
        />
      </aside>
    </div>
  );
};

export default DrawingWidget;
