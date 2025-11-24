import { RoomFilterTabs } from './RoomFilterTabs';
import { SearchBar } from './SearchBar';
import { NotificationButton } from './NotificationButton';
import { CreateRoomButton } from './CreateRoomButton';

interface MainHeaderProps {
  searchQuery: string;
  onChangeSearch: (v: string) => void;
  onSearch: () => void;
  onClickCreateRoom: () => void;
}

export const MainHeader = ({
  searchQuery,
  onChangeSearch,
  onSearch,
  onClickCreateRoom,
}: MainHeaderProps) => {
  return (
    <div className="flex mt-[6px]">
      <SearchBar
        value={searchQuery}
        onChange={onChangeSearch}
        onSearch={onSearch}
      />
      <RoomFilterTabs />
      <NotificationButton />
      <CreateRoomButton onClick={onClickCreateRoom} />
    </div>
  );
};
