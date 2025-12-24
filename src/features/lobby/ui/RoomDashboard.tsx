import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Cog8ToothIcon } from '@heroicons/react/24/solid';

import { GameChat } from '@/entities/chat';
import { MenuButton } from './MenuButton';

export const RoomDashboard = () => {
  return (
    <div className="flex flex-col p-4 h-[449px] border border-white rounded-xl">
      <div className="grid grid-cols-3 gap-x-5 mb-2 h-[60px] shrink-0">
        <MenuButton
          label="상점"
          color="RED"
          icon={<ShoppingCartIcon className="w-8 h-8" />}
        />
        <MenuButton
          label="옷장"
          color="YELLOW"
          icon={<ShoppingCartIcon className="w-8 h-8" />}
        />
        <MenuButton
          label="방설정"
          color="BLACK"
          icon={<Cog8ToothIcon className="w-8 h-8" />}
        />
      </div>

      <div className="flex-1 min-h-0 mt-2">
        <GameChat />
      </div>
    </div>
  );
};
