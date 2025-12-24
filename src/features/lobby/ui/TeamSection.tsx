import type { Player } from '@/entities/game';
import { cn } from '@/shared/lib';
import { PlayerSlot } from './PlayerSlot';

interface TeamSectionProps {
  gradient: string;
  players: Player[];
  hostId?: string | null;
  amIHost: boolean;
  myUserId: string;
  onKick: (userId: string, nickname: string) => void;
}

export const TeamSection = ({
  gradient,
  players,
  hostId,
  amIHost,
  myUserId,
  onKick,
}: TeamSectionProps) => {
  return (
    <div className={cn('flex-1 bg-gradient-to-b p-4', gradient)}>
      <div className="grid grid-cols-3 gap-4 w-full h-full">
        {Array.from({ length: 3 }).map((_, index) => {
          const player = players[index];
          const isHost = player ? hostId === player.userId : false;
          const canKick = amIHost && player && player.userId !== myUserId;

          return (
            <PlayerSlot
              key={player?.userId || `empty-${index}`}
              player={player}
              isHost={isHost}
              canKick={!!canKick}
              onKick={() => player && onKick(player.userId, player.nickname)}
            />
          );
        })}
      </div>
    </div>
  );
};
