import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/solid';

import { AddFriendButton } from '@/features/add-friend';

interface FriendHeaderProps {
  value: string;
  onChange: (value: string) => void;
}

export const FriendHeader = ({ value, onChange }: FriendHeaderProps) => {
  return (
    <div className="flex items-center justify-between pl-4 pr-5 pt-10 w-full">
      <span className="mb-10 text-white text-5xl font-bold tracking-tight">
        친구
      </span>

      <div className="flex items-center gap-x-2">
        <button className="flex items-center justify-center w-11 h-11 rounded-full bg-white/30 border-4 border-white/5 hover:bg-white/20 transition-all">
          <BellIcon className="w-8 h-8 text-white" />
        </button>

        <AddFriendButton />

        <div className="flex items-center w-[450px] mr-6 h-12 bg-white rounded-2xl overflow-hidden shadow-xl focus-within:ring-2 focus-within:ring-[#2ADB75] transition-all">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="태그나 이름을 입력해주세요."
            autoComplete="off"
            className="flex-1 px-4 text-gray-500 text-xl outline-none placeholder:text-gray-300 font-medium"
          />
          <div className="flex items-center justify-center w-14 h-full bg-[#F0F0F0] border-l border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
            <MagnifyingGlassIcon className="w-7 h-7 text-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
};
