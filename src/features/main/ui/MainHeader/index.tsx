import type { RoomFilter } from '@/features/main/constants/filters';
import { RoomFilterTabs } from './RoomFilterTabs';
import { SearchBar } from './SearchBar';
import { NotificationButton } from './NotificationButton';
import { CreateRoomButton } from './CreateRoomButton';

interface MainHeaderProps {
  searchQuery: string;
  onChangeSearch: (v: string) => void;
  onSearch: () => void;
  roomFilter: RoomFilter;
  onChangeFilter: (v: RoomFilter) => void;
  onClickCreateRoom: () => void;
}

export const MainHeader = ({
  searchQuery,
  onChangeSearch,
  onSearch,
  roomFilter,
  onChangeFilter,
  onClickCreateRoom,
}: MainHeaderProps) => {
  return (
    <div className="flex mt-[6px]">
      <SearchBar
        value={searchQuery}
        onChange={onChangeSearch}
        onSearch={onSearch}
      />
      <RoomFilterTabs currentFilter={roomFilter} onChange={onChangeFilter} />
      <NotificationButton />
      <CreateRoomButton onClick={onClickCreateRoom} />
    </div>
  );
};
