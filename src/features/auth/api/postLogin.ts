import { instance } from '@/shared/api/axios';
import type { LoginCredentials } from '@/features/auth/model/auth.type';

export const postLogin = async (credentials: LoginCredentials) => {
  const response = await instance.post('auth/login', credentials);
  return response.data;
};
