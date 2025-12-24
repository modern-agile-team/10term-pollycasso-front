import { instance } from '@/shared/api';

export const postRefreshToken = async () => {
  const response = await instance.post('auth/refresh');
  return response.data;
};
