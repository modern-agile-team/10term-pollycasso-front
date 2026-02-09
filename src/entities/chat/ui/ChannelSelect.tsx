import { UserIcon } from '@heroicons/react/24/outline';

import { cn } from '@/shared/lib';

interface ChannelSelectProps {
  selected: { label: string; value: string };
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}

export const ChannelSelect = ({
  selected,
  isOpen,
  onToggle,
  onSelect,
}: ChannelSelectProps) => {
  const isFriendClassName =
    selected.value === 'direct' ? 'text-[#305946]' : 'text-gray-800';
  const isOpenClassName = isOpen
    ? 'bg-white text-[#305946]'
    : 'bg-[#305946] text-white';

  return (
    <div
      className="flex items-center bg-white rounded-l-xl pl-2 pr-0 h-full cursor-pointer select-none relative"
      onClick={onToggle}
    >
      <span className={cn('text-[30px] font-bold pr-2', isFriendClassName)}>
        {selected.label}
      </span>

      <span
        className={cn(
          'w-10 h-full flex items-center justify-center text-xl border-l border-r border-[#305946]',
          isOpenClassName,
        )}
      >
        {isOpen ? '▲' : '▼'}
      </span>

      {isOpen && (
        <div className="absolute left-0 top-[50px] w-[115px] bg-white border border-black rounded-xl shadow-lg z-50 overflow-hidden">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect('global');
            }}
            className="px-3 py-2 text-[24px] cursor-pointer hover:bg-gray-200 text-black"
          >
            전체
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect('direct');
            }}
            className="px-3 py-2 text-[24px] cursor-pointer hover:bg-gray-200 text-[#305946] font-bold"
          >
            친구
            <UserIcon className="w-7 h-7 inline-block ml-4" />
          </div>
        </div>
      )}
    </div>
  );
};
