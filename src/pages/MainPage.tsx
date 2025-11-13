import { useState } from 'react';
import { useAuthStore } from '@/features/auth/model';
import { useMain } from '@/features/main/model';
import {
  SideBar,
  MainHeader,
  RoomList,
  Chat,
  CreateRoomModal,
} from '@/features/main/ui';
import { mockRooms } from '@/features/main/constants/rooms';

const MainPage = () => {
  const { clearAuth } = useAuthStore();
  const {
    searchQuery,
    setSearchQuery,
    roomFilter,
    setRoomFilter,
    commitSearch,
    setCommitSearch,
  } = useMain();

  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

  const currentLv = 1;
  const nickname = '밥아저씨';
  const currentXp = 30;
  const maxXp = 50;

  const handleLogout = () => clearAuth();
  const handleSearch = () => setCommitSearch(searchQuery.trim());

  const filteredRooms = mockRooms.filter((room) => {
    const filterMatch =
      roomFilter === '전체' ||
      (roomFilter === '대기' && room.status === 'WAITING') ||
      (roomFilter === '개인' && room.mode === 'SOLO') ||
      (roomFilter === '팀' && room.mode === 'TEAM');

    const search = commitSearch.trim().toLowerCase();
    const searchMatch =
      !search ||
      room.name.toLowerCase().includes(search) ||
      room.id.toString().includes(search);

    return filterMatch && searchMatch;
  });

  return (
    <div className="flex items-center justify-center min-w-[1500px] mx-auto min-h-screen gap-x-10 font-ssrm font-bold">
      {/* 좌측 사이드바 */}
      <SideBar
        nickname={nickname}
        level={currentLv}
        currentXp={currentXp}
        maxXp={maxXp}
        onLogout={handleLogout}
      />

      {/* 우측 */}
      <div className="w-[1100px] h-[760px] px-10 py-10 rounded-3xl bg-[#1E3411]/40">
        <MainHeader
          searchQuery={searchQuery}
          onChangeSearch={setSearchQuery}
          onSearch={handleSearch}
          roomFilter={roomFilter}
          onChangeFilter={setRoomFilter}
          onClickCreateRoom={() => setIsCreateRoomModalOpen(true)}
        />

        <RoomList
          rooms={filteredRooms}
          onEnter={(id) => console.log(`방 입장: ${id}`)}
          onMenu={(id) => console.log(`메뉴 클릭: ${id}`)}
        />

        <Chat />
      </div>

      {isCreateRoomModalOpen && (
        <CreateRoomModal onClose={() => setIsCreateRoomModalOpen(false)} />
      )}
    </div>
  );
};

export default MainPage;
