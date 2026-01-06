import type { RoomState } from '@/shared/model';

export const selectMe = (state: RoomState | null, myId: string) =>
  state?.players.find((p) => p.userId === myId) ?? null;

export const selectTeams = (state: RoomState | null) => ({
  blue: state?.players.filter((p) => p.teamId === 'BLUE') ?? [],
  red: state?.players.filter((p) => p.teamId === 'RED') ?? [],
});

export const selectOtherPlayers = (state: RoomState | null) => {
  if (!state) return [];
  return state.players.filter((p) => p.userId !== state.hostId);
};

export const selectCanStartGame = (state: RoomState | null) => {
  const others = selectOtherPlayers(state);
  return others.length > 0 && others.every((p) => p.isReady);
};

export const selectTopBottomTeams = (state: RoomState | null, myId: string) => {
  const me = selectMe(state, myId);
  const { blue, red } = selectTeams(state);

  const myTeamId = me?.teamId || 'BLUE';
  const isMyTeamBlue = myTeamId === 'BLUE';

  const topTeamId = isMyTeamBlue ? 'BLUE' : 'RED';
  const bottomTeamId = isMyTeamBlue ? 'RED' : 'BLUE';

  const rawTop = isMyTeamBlue ? blue : red;
  const rawBottom = isMyTeamBlue ? red : blue;

  const topTeamPlayers = me
    ? [
        ...rawTop.filter((p) => p.userId === me.userId),
        ...rawTop.filter((p) => p.userId !== me.userId),
      ]
    : rawTop;

  const bottomTeamPlayers = rawBottom;

  return {
    topTeamId,
    bottomTeamId,
    topTeamPlayers,
    bottomTeamPlayers,
  };
};
