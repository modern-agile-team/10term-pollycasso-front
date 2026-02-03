import type { RoomState } from '@/shared/model';

/**
 * 1. 나(Me)를 찾는 셀렉터
 * 서버의 userId가 숫자일 수 있으므로 문자열로 강제 변환하여 비교합니다.
 */
export const selectMe = (state: RoomState | null, myId: string | number) =>
  state?.players.find((p) => String(p.userId) === String(myId)) ?? null;

/**
 * 2. 팀별 플레이어 분류
 * 필드명을 teamId -> team으로 맞추고, NONE 상태인 유저도 관리합니다.
 */
export const selectTeams = (state: RoomState | null) => ({
  blue: state?.players.filter((p) => p.team === 'BLUE') ?? [],
  red: state?.players.filter((p) => p.team === 'RED') ?? [],
  none: state?.players.filter((p) => p.team === 'NONE') ?? [],
});

/**
 * 3. 방장 제외 나머지 플레이어 추출
 */
export const selectOtherPlayers = (state: RoomState | null) => {
  if (!state) return [];
  return state.players.filter((p) => String(p.userId) !== String(state.hostId));
};

/**
 * 4. 게임 시작 가능 여부 판단
 * - 최소 인원(본인 포함 2명 이상) 조건 추가
 * - 방장을 제외한 모든 유저가 준비 상태인지 확인
 */
export const selectCanStartGame = (state: RoomState | null) => {
  if (!state || state.players.length < 2) return false;

  // 방장을 제외한 다른 플레이어들만 추출
  const otherPlayers = state.players.filter(
    (p) => String(p.userId) !== String(state.hostId),
  );

  // 방장 제외 모두가 준비 완료되었는지 확인
  return otherPlayers.length > 0 && otherPlayers.every((p) => p.isReady);
};

/**
 * 5. 상/하단 배치용 팀 데이터 가공
 */
export const selectTopBottomTeams = (
  state: RoomState | null,
  myId: string | number,
) => {
  const me = selectMe(state, myId);
  const { blue, red, none } = selectTeams(state);

  // 내 팀이 없거나 BLUE면 BLUE를 상단(Top)에 노출
  const myTeam = me?.team || 'BLUE';
  const isMyTeamBlue = myTeam === 'BLUE' || myTeam === 'NONE';

  const topTeamId = isMyTeamBlue ? 'BLUE' : 'RED';
  const bottomTeamId = isMyTeamBlue ? 'RED' : 'BLUE';

  // NONE 상태인 유저도 렌더링될 수 있게 내 진영에 포함
  const rawTop = isMyTeamBlue ? [...blue, ...none] : red;
  const rawBottom = isMyTeamBlue ? red : [...blue, ...none];

  // 내가 항상 내 진영의 첫 번째 칸에 오도록 정렬
  const topTeamPlayers = me
    ? [
        ...rawTop.filter((p) => String(p.userId) === String(me.userId)),
        ...rawTop.filter((p) => String(p.userId) !== String(me.userId)),
      ]
    : rawTop;

  return {
    topTeamId,
    bottomTeamId,
    topTeamPlayers,
    bottomTeamPlayers: rawBottom,
  };
};
