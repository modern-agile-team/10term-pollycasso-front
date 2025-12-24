import {
  GameCanvas,
  GameHeader,
  GameSubmitButton,
  InventoryPanel,
  PlayerSidebar,
} from '@/features/game';
import { useGameDrawing } from '../model/useGameDrawing';

const GameWidget = () => {
  const { players, inventory, endsAt, currentTheme } = useGameDrawing();

  const completedCount = 3;
  const totalCount = 6;
  const handleComplete = () => console.log('제출');

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
          onComplete={handleComplete}
          completedCount={completedCount}
          totalCount={totalCount}
        />
      </aside>
    </div>
  );
};

export default GameWidget;
