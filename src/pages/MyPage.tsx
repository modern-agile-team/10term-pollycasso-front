import { useAuthStore } from '@/entities/user';
import { useLogout } from '@/features/auth';
import { Sidebar } from '@/widgets/sidebar';
import { ProfileSection, SettingsSection } from '@/features/mypage';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { BackButton } from '@/shared/ui/BackButton';

const MyPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useAuthStore((state) => state.user);
  const { logout } = useLogout();

  const section = searchParams.get('section');
  const isSettingsMode = section === 'settings';

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-w-[1500px] mx-auto min-h-screen gap-x-10 font-ssrm font-bold">
      <BackButton />

      <Sidebar
        nickname={user.nickname}
        level={user.level!}
        currentXp={user.currentExp!}
        coin={user.coin!}
        outfit={user.outfit!}
        onLogout={logout}
        currentPage="mypage"
      />

      <div className="w-[1100px] h-[760px] p-10 rounded-3xl bg-[#1E3411]/40 text-white font-light">
        <h1 className="text-4xl font-bold mb-10">
          {isSettingsMode ? '환경설정' : '개인정보 수정'}
        </h1>

        {isSettingsMode ? <SettingsSection /> : <ProfileSection user={user} />}
      </div>
    </div>
  );
};

export default MyPage;
