import { useLocation, useNavigate } from 'react-router';

import { MainChat } from '@/entities/chat';
import { useAuthStore } from '@/entities/user';
import { useLogout } from '@/features/auth';
import {
  CreateRoomModal,
  MainHeader,
  RoomList,
  useCreateRoomModalStore,
  useSearchStore,
  KickModal,
} from '@/features/main';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/widgets/sidebar';
import { useSound } from '@/entities/sound';
import { SoundManager } from '@/shared/api/sound/manager';
import { SOUND_ASSETS } from '@/shared/api/sound/assets';

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const { logout } = useLogout();

  const { searchQuery, setSearchQuery, setCommitSearch } = useSearchStore();
  const { open: openCreateRoomModal } = useCreateRoomModalStore();

  const [isKickModalOpen, setIsKickModalOpen] = useState(false);

  const { isMuted, sfxVolume } = useSound();

  const playClick = () => {
    if (!isMuted) {
      SoundManager.playSfx(SOUND_ASSETS.SFX.CLICK, sfxVolume);
    }
  };

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

  const handleLogout = () => {
    playClick();
    logout();
  };

  const handleSearch = () => {
    playClick();
    setCommitSearch(searchQuery.trim());
  };

  const handleEnterRoom = (id: number) => {
    playClick();
    navigate(`/rooms/${id}`);
  };

  const handleCreateRoomClick = () => {
    playClick();
    openCreateRoomModal();
  };

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-w-[1500px] mx-auto min-h-screen gap-x-10 font-ssrm font-bold">
      <Sidebar
        nickname={user.nickname}
        level={user.level!}
        currentXp={user.currentExp!}
        coin={user.coin!}
        outfit={user.outfit!}
        onLogout={handleLogout}
      />

      <div className="w-[1100px] h-[760px] px-10 py-10 rounded-3xl bg-[#1E3411]/40">
        <MainHeader
          searchQuery={searchQuery}
          onChangeSearch={setSearchQuery}
          onSearch={handleSearch}
          onClickCreateRoom={handleCreateRoomClick}
        />

        <RoomList onEnter={handleEnterRoom} onMenu={playClick} />

        <MainChat />
      </div>

      <CreateRoomModal />

      {isKickModalOpen && (
        <KickModal
          onConfirm={() => {
            playClick();
            setIsKickModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default MainPage;
