import { instance } from '@/shared/api/axios';

export const postRefreshToken = async () => {
  const response = await instance.post('auth/refresh');
  return response.data;
};
