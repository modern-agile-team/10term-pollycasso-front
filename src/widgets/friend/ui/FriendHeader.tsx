import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/solid';

export const FriendHeader = () => {
  return (
    <div className="flex items-center justify-between pl-4 pr-11 pt-10 w-full">
      <span className="mb-10 text-white text-5xl font-bold tracking-tight">
        친구
      </span>

      <div className="flex items-center gap-x-2">
        <button className="flex items-center justify-center w-11 h-11 rounded-full bg-white/30 border-4 border-white/5 hover:bg-white/20 transition-all">
          <BellIcon className="w-8 h-8 text-white" />
        </button>

        <div className="p-1.5 mr-4 rounded-[20px] bg-white/10 border border-white/10">
          <button className="px-6 py-1 rounded-[14px] bg-[#2ADB75] hover:bg-[#52c97a] text-white text-2xl font-bold shadow-[0_0_20px_rgba(99,230,141,0.3)] transition-all">
            친구추가
          </button>
        </div>

        <div className="flex items-center w-[450px] h-12 bg-white rounded-2xl overflow-hidden shadow-xl">
          <input
            type="text"
            placeholder="태그나 이름을 입력해주세요."
            className="flex-1 px-4 text-gray-500 text-xl outline-none placeholder:text-gray-300 font-medium"
          />
          <div className="flex items-center justify-center w-16 h-full bg-[#F0F0F0] border-l border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
            <MagnifyingGlassIcon className="w-7 h-7 text-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
};
