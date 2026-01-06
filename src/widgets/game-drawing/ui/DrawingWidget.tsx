import { useCallback, useEffect, useMemo, useState } from 'react';

import { GameCanvas } from '@/features/drawing';
import {
  DrawingToolbox,
  GameHeader,
  GameSubmitButton,
  GameTimer,
  InventoryPanel,
  PlayerSidebar,
  ThemeSelector,
} from '@/features/game';
import { SOCKET_EVENTS, useSocket } from '@/shared/api/socket';
import { PHASE_TIME, RANDOM_THEMES } from '@/shared/model';
import { useGameState } from '../model/useGameState';
import { useGameSubmission } from '../model/useGameSubmission';
import { useThemeSelecting } from '../model/useThemeSelecting';

const DrawingWidget = () => {
  const { status, players, endsAt, inventory, currentTheme } = useGameState();
  const { isMyTurn } = useThemeSelecting();
  const { completedCount, totalCount, isMeReady, toggleReady } =
    useGameSubmission();
  const { socket } = useSocket();
  const [localInput, setLocalInput] = useState('');

  const handleInputChange = (value: string) => {
    setLocalInput(value);
    if (isMyTurn) {
      socket?.emit(SOCKET_EVENTS.GAME_TYPING, { value });
    }
  };

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

  useEffect(() => {
    if (!socket) return;

    const handleTypingShare = (data: { value: string }) => {
      if (!isMyTurn) {
        setLocalInput(data.value);
      }
    };

    socket.on(SOCKET_EVENTS.GAME_TYPING_SHARE, handleTypingShare);

    return () => {
      socket.off(SOCKET_EVENTS.GAME_TYPING_SHARE, handleTypingShare);
    };
  }, [socket, isMyTurn]);

  const handleRandomTheme = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * RANDOM_THEMES.length);
    const randomTheme = RANDOM_THEMES[randomIndex];

    setLocalInput(randomTheme);

    if (socket) {
      socket.emit(SOCKET_EVENTS.GAME_TYPING, { value: randomTheme });
    }
  }, [socket]);

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

  //const isThemeSelecting = status === 'THEME_SELECTING';
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

        <div
          className={`flex-1 flex justify-center bg-white pt-0 items-start relative`}
        >
          {isThemeSelecting ? (
            <ThemeSelector
              isSelector={isMyTurn}
              inputValue={localInput}
              onChange={handleInputChange}
              onRandom={handleRandomTheme}
            />
          ) : (
            <>
              <GameCanvas />

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <DrawingToolbox />
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
