import { http, HttpResponse } from 'msw';

import type { Channel, Friend } from '@/shared/model';

interface ChannelOption {
  label: string;
  value: Channel;
}

export const mockChannels: ChannelOption[] = [
  { label: '[전체]', value: 'global' },
  { label: '[친구]', value: 'direct' },
] as const;

export const mockFriends: Friend[] = [
  { id: 25, name: '테스트용계정2' },
  { id: 2, name: '레전드백엔드' },
  { id: 3, name: 'aa1' },
  { id: 4, name: 'a' },
  { id: 5, name: 'asdf11' },
] as const;

export const chatHandlers = [
  http.get('mock/friends', ({ request }) => {
    const url = new URL(request.url);
    const error = url.searchParams.get('error');

    if (error === 'servererror') {
      return HttpResponse.json(
        { code: 500, message: '친구 목록 조회 실패', errors: [] },
        { status: 500 },
      );
    }

    return HttpResponse.json(mockFriends, { status: 200 });
  }),

  http.get('mock/channels', () => {
    return HttpResponse.json(mockChannels, { status: 200 });
  }),
];
