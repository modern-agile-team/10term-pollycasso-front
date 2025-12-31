import { GameCanvas } from '@/features/drawing/ui/GameCanvas';
import {
  GameHeader,
  GameSubmitButton,
  InventoryPanel,
  PlayerSidebar,
} from '@/features/game';
import { useGameDrawing } from '../model/useGameDrawing';
import { useGameSubmission } from '../model/useGameSubmission';

const GameWidget = () => {
  const { inventory, endsAt, currentTheme } = useGameDrawing();

  const { players, completedCount, totalCount, isMeReady, toggleReady } =
    useGameSubmission();

  return (
    <div className="w-full h-screen flex justify-between items-center font-ssrm px-20 py-4 overflow-hidden gap-16">
      <PlayerSidebar players={players} />

      <main className="w-full h-full rounded-3xl bg-white shadow-xl flex flex-col relative overflow-hidden">
        <GameHeader currentTheme={currentTheme} endsAt={endsAt} />
        <GameCanvas />
      </main>

      <aside className="h-full flex flex-col justify-center gap-y-20">
        <InventoryPanel inventory={inventory} />

        <GameSubmitButton
          onComplete={toggleReady}
          completedCount={completedCount}
          totalCount={totalCount}
          isReady={isMeReady}
        />
      </aside>
    </div>
  );
};

export default GameWidget;
