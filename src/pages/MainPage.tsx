import { useNavigate } from 'react-router';

import { MainChat } from '@/entities/chat';
import { useAuthStore } from '@/features/auth'; // TODO: useAuthStore 경로변경
import {
  CreateRoomModal,
  MainHeader,
  RoomList,
  SideBar,
  useCreateRoomModalStore,
  useSearchStore,
} from '@/features/main';

const MainPage = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const { searchQuery, setSearchQuery, setCommitSearch } = useSearchStore();

  const { open: openCreateRoomModal } = useCreateRoomModalStore();

  const currentLv = 1;
  const nickname = '밥아저씨';
  const currentXp = 30;
  const maxXp = 50;

  const handleLogout = () => clearAuth();
  const handleSearch = () => setCommitSearch(searchQuery.trim());
  const handleEnterRoom = (id: number) => {
    navigate(`/rooms/${id}`);
  };

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
          onClickCreateRoom={openCreateRoomModal}
        />

        {/* TODO: 메뉴 클릭시 페이지 이동 로직 구현 */}
        <RoomList
          onEnter={handleEnterRoom}
          onMenu={(id) => console.log(`메뉴 클릭: ${id}`)}
        />

        <MainChat />
      </div>

      <CreateRoomModal />
    </div>
  );
};

export default MainPage;
