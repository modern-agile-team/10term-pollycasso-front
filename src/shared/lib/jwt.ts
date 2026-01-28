import { jwtDecode } from 'jwt-decode';

export interface AccessJwtPayload {
  sub: number;
  nickname: string;
  tag: string;
  iat?: number;
  exp?: number;
}

export const parseAccessToken = (token: string) => {
  const decoded = jwtDecode<AccessJwtPayload>(token);
  return decoded;
};
