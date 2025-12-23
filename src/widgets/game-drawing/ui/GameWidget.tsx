import {
  GameCanvas,
  GameHeader,
  InventoryPanel,
  PlayerSidebar,
} from '@/features/game';
import { useGameDrawing } from '../model/useGameDrawing';

const GameWidget = () => {
  const { players, inventory, endsAt, currentTheme } = useGameDrawing();

  return (
    <div className="w-full h-screen flex justify-between items-center font-ssrm px-20 py-4 overflow-hidden gap-16">
      <PlayerSidebar players={players} />

      <main className="w-full h-full rounded-3xl bg-white shadow-xl flex flex-col relative overflow-hidden">
        <GameHeader currentTheme={currentTheme} endsAt={endsAt} />
        <GameCanvas />
      </main>

      <InventoryPanel inventory={inventory} />
    </div>
  );
};

export default GameWidget;
