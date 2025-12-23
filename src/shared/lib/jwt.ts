import { jwtDecode } from 'jwt-decode';

export interface AccessJwtPayload {
  sub: string;
  nickname: string;
}

export const parseAccessToken = (token: string) => {
  const decoded = jwtDecode<AccessJwtPayload>(token);
  return decoded;
};
