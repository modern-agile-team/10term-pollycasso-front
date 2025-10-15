import { instance } from '@/shared/api';
import type { SignupRequest, SignupResponse } from '@/features/auth/model';

export const postSignup = async (
  credentials: SignupRequest,
): Promise<SignupResponse> => {
  const { data } = await instance.post('auth/signup', credentials);
  return data;
};
