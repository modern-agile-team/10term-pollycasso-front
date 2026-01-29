import { instance } from '@/shared/api';

export const postLogout = async (): Promise<void> => {
  await instance.post('auth/logout');
};
