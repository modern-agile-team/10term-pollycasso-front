import { instance } from '@/shared/api/axios';
import type { LoginRequest, LoginResponse } from '../model/types';

export const postLogin = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const { data } = await instance.post('auth/login', credentials);
  return data;
};
