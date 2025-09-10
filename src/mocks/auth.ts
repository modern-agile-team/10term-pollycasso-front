import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post(`auth/login`, () => {
    return HttpResponse.json(
      {
        accessToken: 'mock-access-token-12345',
        refreshToken: 'mock-refresh-token-67890',
        user: {
          id: 'user-1',
          name: '테스트 유저',
        },
      },
      { status: 200 },
    );
  }),

  http.post('auth/token', () => {
    const mockResponse = {
      accessToken: 'mock-new-access-token',
      refreshToken: 'mock-new-refresh-token',
      expiresIn: 3600,
    };

    return HttpResponse.json(mockResponse, { status: 200 });
  }),
];
