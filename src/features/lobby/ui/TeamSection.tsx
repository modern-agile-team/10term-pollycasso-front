import type { Player } from '@/shared/model';
import { cn } from '@/shared/lib';
import { PlayerSlot } from './PlayerSlot';

interface TeamSectionProps {
  gradient: string;
  players: Player[];
  hostId?: string | null;
  amIHost: boolean;
  myUserId: string;
  onKick: (userId: string, nickname: string) => void;
  onNudge: (userId: string) => void;
}

export const TeamSection = ({
  gradient,
  players,
  hostId,
  amIHost,
  myUserId,
  onKick,
  onNudge,
}: TeamSectionProps) => {
  return (
    <div className={cn('flex-1 bg-gradient-to-b p-4', gradient)}>
      <div className="grid grid-cols-3 gap-4 w-full h-full">
        {Array.from({ length: 3 }).map((_, index) => {
          const player = players[index];
          const isHost =
            player && hostId ? String(hostId) === String(player.userId) : false;
          const isMe = player && String(player.userId) === String(myUserId);
          const canKick = amIHost && player && !isMe;
          const canNudge = player && !isMe;

          return (
            <PlayerSlot
              key={player?.userId || `empty-${index}`}
              player={player}
              isHost={isHost}
              canKick={!!canKick}
              onKick={() => player && onKick(player.userId, player.nickname)}
              onNudge={canNudge ? () => onNudge(player.userId) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};
