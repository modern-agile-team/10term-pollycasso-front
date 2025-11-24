import { useAuthStore } from '@/features/auth/model';
import {
  SideBar,
  MainHeader,
  RoomList,
  Chat,
  CreateRoomModal,
} from '@/features/main/ui';
import { useCreateRoomModalStore } from '@/features/main/model/useCreateRoomModalStore';
import { useSearchStore } from '@/features/main/model/useSearchStore';

const MainPage = () => {
  const { clearAuth } = useAuthStore();
  const { searchQuery, setSearchQuery, setCommitSearch } = useSearchStore();

  const { open: openCreateRoomModal } = useCreateRoomModalStore();

  const currentLv = 1;
  const nickname = '밥아저씨';
  const currentXp = 30;
  const maxXp = 50;

  const handleLogout = () => clearAuth();
  const handleSearch = () => setCommitSearch(searchQuery.trim());

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

        {/* 구현 후 수정 */}
        <RoomList
          onEnter={(id) => console.log(`방 입장: ${id}`)}
          onMenu={(id) => console.log(`메뉴 클릭: ${id}`)}
        />

        <Chat />
      </div>

      <CreateRoomModal />
    </div>
  );
};

export default MainPage;
