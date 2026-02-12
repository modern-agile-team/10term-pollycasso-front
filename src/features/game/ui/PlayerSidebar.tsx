import type { DragEvent } from 'react';
import { useState } from 'react';

import { PlayerAvatar } from '@/entities/game';
import { useSocket } from '@/shared/api/socket';
import { cn } from '@/shared/lib';
import type { Player } from '@/shared/model';
import { COLORS } from '../constants/game';

interface PlayerSidebarProps {
  players: Player[];
  currentUserId: string | number;
}

export const PlayerSidebar = ({
  players,
  currentUserId,
}: PlayerSidebarProps) => {
  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);

  const { socket } = useSocket();

  const handleDragOver = (e: DragEvent, targetUserId: string) => {
    if (targetUserId === currentUserId) {
      return;
    }

    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setHoveredUserId(targetUserId);
  };

  const handleDragLeave = () => {
    setHoveredUserId(null);
  };

  const handleDrop = (e: DragEvent, targetPlayer: Player) => {
    e.preventDefault();
    setHoveredUserId(null);

    if (targetPlayer.userId === currentUserId) {
      return;
    }

    const itemId = e.dataTransfer.getData('item-id');

    if (!socket) {
      return;
    }

    socket.emit('game:useItem', {
      itemId,
      targetUserId: targetPlayer.userId,
    });
  };

  return (
    <aside
      className="py-16 px-6 w-auto h-auto rounded-2xl flex flex-col gap-6 justify-center min-w-[120px]"
      style={{ backgroundColor: COLORS.PRIMARY_DARK }}
    >
      {players.map((player) => {
        const isMe = player.userId === currentUserId;

        return (
          <div
            key={player.userId}
            onDragOver={(e) => handleDragOver(e, player.userId)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, player)}
            className={cn(
              'rounded-xl transition-all duration-200 border-4 border-transparent p-2 flex flex-col items-center justify-center',
              hoveredUserId === player.userId
                ? 'border-yellow-400 bg-white/10 scale-105 shadow-[0_0_15px_rgba(250,204,21,0.5)]'
                : '',
              isMe ? 'opacity-80 cursor-default' : '',
            )}
          >
            <div className="pointer-events-none">
              <PlayerAvatar
                nickname={player.nickname}
                level={player.level}
                isConnected={player.isConnected}
              />
            </div>
          </div>
        );
      })}
    </aside>
  );
};
