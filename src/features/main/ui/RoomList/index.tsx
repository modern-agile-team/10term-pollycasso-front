import { RoomCard } from './RoomCard';
import type { Room } from '@/features/main/model/types';

interface Props {
  rooms: Room[];
  onEnter: (id: number) => void;
  onMenu: (id: number) => void;
}

export const RoomList = ({ rooms, onEnter, onMenu }: Props) => {
  return (
    <div
      className="
        mt-5 h-[400px] rounded-2xl overflow-y-auto pr-3
        scrollbar 
        scrollbar-thumb-white 
        hover:scrollbar-thumb-white/90
        scrollbar-thumb-rounded-full
        scrollbar-w-5
        scrollbar-border-2
        scrollbar-stable
      "
    >
      <div className="grid grid-cols-2 gap-y-5 gap-x-2 text-3xl">
        {rooms.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-44">
            <span className="text-white text-3xl font-bold drop-shadow">
              방을 만들어주세요!
            </span>
          </div>
        ) : (
          rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onEnterRoom={() => onEnter(room.id)}
              onOpenMenu={() => onMenu(room.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};
