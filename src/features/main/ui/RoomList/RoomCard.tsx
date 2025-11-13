import {
  EllipsisVerticalIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import type { Room } from '@/entities/room';
import {
  ROOM_MODE,
  ROOM_STATUS,
} from '@/entities/room/constants/roomConstants';

interface RoomCardProps {
  room: Room;
  onEnterRoom?: (roomId: number) => void;
  onOpenMenu?: (roomId: number) => void;
}

export const RoomCard = ({ room, onEnterRoom, onOpenMenu }: RoomCardProps) => {
  const status = ROOM_STATUS[room.status];
  const mode = ROOM_MODE[room.mode];

  return (
    <div
      className="
        w-[480px] h-[120px] rounded-2xl bg-white p-4 cursor-pointer
        hover:bg-white/90 transition
      "
      onClick={() => onEnterRoom?.(room.id)}
    >
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center px-3 py-1 rounded-xl ${status.bg}`}
        >
          <span className="text-xl text-white">{room.id}</span>
        </div>

        <p className="ml-2 text-black text-3xl font-bold flex items-center gap-2">
          {room.name}
          {room.isPrivate && (
            <LockClosedIcon className="w-5 h-5 text-gray-600 inline-block" />
          )}
        </p>

        <button
          className="ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMenu?.(room.id);
          }}
        >
          <EllipsisVerticalIcon className="w-8 h-8 text-black cursor-pointer" />
        </button>
      </div>

      <div className="flex justify-end items-center gap-x-3 mt-6 pr-2">
        <div
          className={`px-3 rounded-xl text-white text-lg font-bold ${mode.bg}`}
        >
          {mode.label}
        </div>

        <span className={`text-xl font-normal ${status.text}`}>
          {status.label}
        </span>

        <span className="text-black text-lg font-semibold">
          {room.currentPlayers} / {room.maxPlayers}
        </span>
      </div>
    </div>
  );
};
