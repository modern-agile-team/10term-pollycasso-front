import { GAME_DATA } from '@/mocks/game.mock';
import { PlayerSidebar } from '@/features/game/ui/PlayerSidebar';
import { InventoryPanel } from '@/features/game/ui/InventoryPanel';
import { GameHeader } from '@/features/game/ui/GameHeader';
import { GameCanvas } from '@/features/game/ui/GameCanvas';

const GameWidget = () => {
  const { players, myItems, timer, currentTheme } = GAME_DATA;

  return (
    <div className="w-full h-screen flex justify-between items-center font-ssrm px-20 py-4 overflow-hidden gap-16">
      <PlayerSidebar players={players} />

      <main className="w-full h-full rounded-3xl bg-white shadow-xl flex flex-col relative overflow-hidden">
        <GameHeader theme={currentTheme} timer={timer} />
        <GameCanvas />
      </main>

      <InventoryPanel myItems={myItems} />
    </div>
  );
};

export default GameWidget;
