import type { ReactNode } from 'react';
import { Spinner } from '@/shared/ui/Spinner';
import { PasswordModal } from '@/features/main/ui/PasswordModal';

interface RoomEntryGuardProps {
  isLoading: boolean;
  isPasswordRequired: boolean;
  passwordError: string | null;
  onJoinWithPassword: (password: string) => void;
  onLeave: () => void;
  children: ReactNode;
}

export const RoomEntryGuard = ({
  isLoading,
  isPasswordRequired,
  passwordError,
  onJoinWithPassword,
  onLeave,
  children,
}: RoomEntryGuardProps) => {
  if (isLoading) {
    return (
      <>
        <Spinner
          size="xl"
          transparent
          fixed
          overlay
          message="방 정보를 불러오는 중입니다..."
        />

        {isPasswordRequired && (
          <PasswordModal
            error={passwordError}
            onSubmit={onJoinWithPassword}
            onCancel={onLeave}
          />
        )}
      </>
    );
  }

  return <>{children}</>;
};
