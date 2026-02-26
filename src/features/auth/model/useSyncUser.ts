import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authQueries } from '../queries/authQueries';
import { useAuthStore } from '@/entities/user';

export const useSyncUser = () => {
  const setProfile = useAuthStore((state) => state.setProfile);
  const user = useAuthStore((state) => state.user);
  const query = useQuery(authQueries.user());

  useEffect(() => {
    if (query.data) {
      setProfile(query.data);
    }
  }, [query.data, setProfile]);

  return {
    ...query,
    isLoggedIn: !!user,
  };
};
