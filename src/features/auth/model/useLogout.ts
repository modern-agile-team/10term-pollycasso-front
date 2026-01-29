import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/entities/user';
import { authQueries } from '../queries/authQueries';

export const useLogout = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { mutate: logout, isPending } = useMutation({
    ...authQueries.logout(),

    onSuccess: () => {
      clearAuth();
      navigate('/login', { replace: true });
    },

    onError: () => {
      clearAuth();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isPending };
};
