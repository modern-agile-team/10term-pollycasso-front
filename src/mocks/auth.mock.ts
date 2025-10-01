import { http, HttpResponse } from 'msw';

const USERS = [
  {
    id: 'id-1',
    username: 'bob1234',
    nickname: '밥아저씨',
    password: 'asdf1234!',
  },
  {
    id: 'id-2',
    username: 'asdf1234',
    nickname: '폴리',
    password: 'asdf1234!',
  },
];

const ERROR_USERS = [{ username: 'hacker1234', password: 'asdf1234!' }];

export const authHandlers = [
  http.post('auth/login', async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (ERROR_USERS.some((u) => u.username === username)) {
      return HttpResponse.json(
        {
          code: 'INTERNAL_SERVER_ERROR',
          message: '서버에 알 수 없는 오류가 발생했습니다.',
          errors: [],
        },
        { status: 500 },
      );
    }

    const user = USERS.find(
      (u) => u.username === username && u.password === password,
    );

    if (!user) {
      return HttpResponse.json(
        {
          code: 'AUTHENTICATION_FAILED',
          message: '아이디 또는 비밀번호가 일치하지 않습니다',
          errors: [],
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        accessToken: 'mock-access-token-12345',
        refreshToken: 'mock-refresh-token-67890',
        user: {
          id: 'user-1',
          username: user.username,
          nickname: user.nickname,
        },
      },
      { status: 200 },
    );
  }),
];
