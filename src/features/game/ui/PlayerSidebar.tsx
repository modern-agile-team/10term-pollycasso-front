import type { Player } from '@/entities/game';
import { PlayerAvatar } from '@/entities/game';
import { COLORS } from '../constants/game';

interface PlayerSidebarProps {
  players: Player[];
}

export const PlayerSidebar = ({ players }: PlayerSidebarProps) => {
  return (
    <aside
      className="py-16 px-6 w-auto h-auto rounded-2xl flex flex-col gap-6 justify-center min-w-[120px]"
      style={{ backgroundColor: COLORS.PRIMARY_DARK }}
    >
      {players.map((player) => (
        <PlayerAvatar
          key={player.userId}
          nickname={player.nickname}
          level={player.level}
          isConnected={player.isConnected}
        />
      ))}
    </aside>
  );
};
