import { http, HttpResponse } from 'msw';

function encode(obj: object) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
}

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

export const authHandlers = [
  http.post('auth/login', async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (username === 'hackeruser1') {
      return HttpResponse.json(
        {
          code: 500,
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
          code: 401,
          message: '아이디 또는 비밀번호가 일치하지 않습니다',
          errors: [],
        },
        { status: 401 },
      );
    }

    const header = encode({ alg: 'HS256', typ: 'JWT' });
    const payload = encode({ sub: user.id, nickname: user.nickname });
    const signature = 'mock-signature';
    const fakeJwt = `${header}.${payload}.${signature}`;

    return HttpResponse.json(
      {
        accessToken: fakeJwt,
        refreshToken: 'mock-refresh-token',
      },
      { status: 200 },
    );
  }),
  http.post('auth/signup', async ({ request }) => {
    const { username, nickname, password } = (await request.json()) as {
      username: string;
      nickname: string;
      password: string;
    };

    if (username === 'erroruser1') {
      return HttpResponse.json(
        {
          code: 500,
          message: '서버 에러 발생',
          errors: [],
        },
        { status: 500 },
      );
    }

    const errors: { field: string; reason: string }[] = [];

    if (username === 'alreadyuser1') {
      errors.push({
        field: 'username',
        reason: '이미 사용중인 아이디입니다.',
      });
    }

    if (nickname === 'alreadyuser2') {
      errors.push({
        field: 'nickname',
        reason: '이미 사용중인 닉네임입니다.',
      });
    }

    if (errors.length > 0) {
      return HttpResponse.json(
        {
          code: 409,
          message: '중복 검사 실패',
          errors,
        },
        { status: 409 },
      );
    }

    const newUser = {
      id: `user-${USERS.length + 1}`,
      username,
      nickname,
      password,
    };
    USERS.push(newUser);

    return HttpResponse.json(
      {
        accessToken: 'mock-access-token-12345',
        refreshToken: 'mock-refresh-token-67890',
        user: {
          id: 'user-1',
          username,
          nickname,
        },
      },
      { status: 200 },
    );
  }),
];
