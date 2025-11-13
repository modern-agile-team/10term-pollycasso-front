import { http, HttpResponse } from 'msw';
// Hyun님이 제공한 타입 경로에서 타입을 가져옵니다.
import type { Friend, Channel } from '@/entities/chat/model/types';

// --- Types ---
interface ChannelOption {
  label: string;
  value: Channel;
}

// --- Mock Data (from rooms.ts) ---
export const mockChannels: ChannelOption[] = [
  { label: '[전체]', value: '전체' },
  { label: '[친구]', value: '친구' },
];

export const mockFriends: Friend[] = [
  { id: 1, name: '레전드프론트엔드' },
  { id: 2, name: '레전드백엔드' },
  { id: 3, name: 'aa1' },
  { id: 4, name: 'a' },
  { id: 5, name: 'asdf11' },
];

export const chatHandlers = [
  // --- 친구 목록 조회 ---
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

  // --- 채팅 채널 목록 조회 ---
  http.get('mock/channels', () => {
    // 참고: 500 에러 케이스가 필요하면 여기에 추가
    return HttpResponse.json(mockChannels, { status: 200 });
  }),
];
