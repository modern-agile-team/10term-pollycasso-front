import { useLocation, useNavigate } from 'react-router';

import { MainChat } from '@/entities/chat';
import { useAuthStore } from '@/entities/user';
import { useLogout } from '@/features/auth';
import {
  CreateRoomModal,
  MainHeader,
  RoomList,
  SideBar,
  useCreateRoomModalStore,
  useSearchStore,
  KickModal,
} from '@/features/main';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const { logout } = useLogout();

  const { searchQuery, setSearchQuery, setCommitSearch } = useSearchStore();
  const { open: openCreateRoomModal } = useCreateRoomModalStore();

  const [isKickModalOpen, setIsKickModalOpen] = useState(false);

  useEffect(() => {
    if (location.state?.isKicked) {
      setIsKickModalOpen(true);

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => logout();
  const handleSearch = () => setCommitSearch(searchQuery.trim());
  const handleEnterRoom = (id: number) => {
    navigate(`/rooms/${id}`);
  };

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-w-[1500px] mx-auto min-h-screen gap-x-10 font-ssrm font-bold">
      <SideBar
        nickname={user.nickname}
        level={user.level!}
        currentXp={user.currentExp!}
        coin={user.coin!}
        outfit={user.outfit!}
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

        <RoomList
          onEnter={handleEnterRoom}
          onMenu={(id) => console.log(`메뉴 클릭: ${id}`)}
        />

        <MainChat />
      </div>

      <CreateRoomModal />

      {isKickModalOpen && (
        <KickModal onConfirm={() => setIsKickModalOpen(false)} />
      )}
    </div>
  );
};

export default MainPage;
