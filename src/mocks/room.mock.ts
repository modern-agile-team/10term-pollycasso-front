import type {
  CreateRoomPayload,
  GameMode,
  Room,
  RoomStatus,
} from '@/entities/room';
import { http, HttpResponse } from 'msw';

// --- Mock Data (from rooms.ts) ---
export const mockRooms: Room[] = [
  {
    id: 2103,
    name: '밥아저씨 컴온!',
    mode: 'SOLO',
    currentPlayers: 1,
    maxPlayers: 4,
    status: 'WAITING',
    isPrivate: false,
  },
  {
    id: 3332,
    name: '하하하하하하하',
    mode: 'SOLO',
    currentPlayers: 4,
    maxPlayers: 4,
    status: 'IN_PROGRESS',
    isPrivate: false,
  },
  {
    id: 7810,
    name: '고수만 와라',
    mode: 'SOLO',
    currentPlayers: 2,
    maxPlayers: 4,
    status: 'WAITING',
    isPrivate: true,
  },
  {
    id: 5521,
    name: '랜덤팀전 ㄱ?',
    mode: 'TEAM',
    currentPlayers: 6,
    maxPlayers: 8,
    status: 'WAITING',
    isPrivate: false,
  },
  {
    id: 9980,
    name: '숨 막히는 전략전',
    mode: 'TEAM',
    currentPlayers: 8,
    maxPlayers: 8,
    status: 'IN_PROGRESS',
    isPrivate: true,
  },
  {
    id: 4411,
    name: '편하게 즐겨요~',
    mode: 'SOLO',
    currentPlayers: 3,
    maxPlayers: 4,
    status: 'WAITING',
    isPrivate: false,
  },
  {
    id: 6666,
    name: '뾰롱',
    mode: 'SOLO',
    currentPlayers: 4,
    maxPlayers: 4,
    status: 'WAITING',
    isPrivate: false,
  },
];

let roomsDB = [...mockRooms];

export const roomHandlers = [
  http.get('mock/rooms', ({ request }) => {
    const url = new URL(request.url);
    const cursor = Number(url.searchParams.get('cursor')) || null;
    const name = url.searchParams.get('name');
    const mode = url.searchParams.get('mode') as GameMode | null;
    const status = url.searchParams.get('status') as RoomStatus | null;
    const limit = 10;

    if (name === 'servererror') {
      return HttpResponse.json(
        { code: 500, message: '서버 조회 중 오류 발생', errors: [] },
        { status: 500 },
      );
    }

    let filteredRooms = roomsDB.filter((room) => {
      if (name && !room.name.includes(name)) return false;
      if (mode && room.mode !== mode) return false;
      if (status && room.status !== status) return false;
      return true;
    });

    const startIndex = cursor
      ? filteredRooms.findIndex((room) => room.id === cursor) + 1
      : 0;

    if (startIndex === -1 || startIndex >= filteredRooms.length) {
      return HttpResponse.json({
        data: [],
        hasNextPage: false,
        nextCursor: null,
      });
    }

    const slicedData = filteredRooms.slice(startIndex, startIndex + limit);
    const hasNextPage = filteredRooms.length > startIndex + limit;
    const nextCursor = hasNextPage
      ? slicedData[slicedData.length - 1].id
      : null;

    return HttpResponse.json({
      data: slicedData,
      hasNextPage,
      nextCursor,
    });
  }),

  http.post('mock/rooms', async ({ request }) => {
    const body = (await request.json()) as CreateRoomPayload;

    if (body.name === 'errorroom') {
      return HttpResponse.json(
        { code: 500, message: '서버 에러 발생', errors: [] },
        { status: 500 },
      );
    }

    if (body.name === 'duplicateroom') {
      return HttpResponse.json(
        {
          code: 409,
          message: '중복 검사 실패',
          errors: [{ field: 'name', reason: '이미 사용중인 방 이름입니다.' }],
        },
        { status: 409 },
      );
    }

    const newRoom: Room = {
      id: Math.floor(Math.random() * 10000),
      name: body.name,
      mode: body.mode,
      maxPlayers: body.maxPlayers,
      isPrivate: body.isPrivate,
      currentPlayers: 1,
      status: 'WAITING',
    };

    roomsDB.unshift(newRoom);

    return HttpResponse.json(newRoom, { status: 201 });
  }),
];
