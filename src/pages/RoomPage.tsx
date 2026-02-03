import {
  RoomActionButtons,
  RoomDashboard,
  TeamSection,
  TeamTab,
  useRoomUI,
  RoomEntryGuard,
} from '@/features/lobby';

const RoomPage = () => {
  const { roomState, me, derived, actions, topGradient, bottomGradient } =
    useRoomUI();

  return (
    <RoomEntryGuard
      isLoading={!roomState}
      isPasswordRequired={derived.isPasswordRequired}
      passwordError={derived.passwordError}
      onJoinWithPassword={actions.joinWithPassword}
      onLeave={actions.handleLeaveImmediately}
    >
      {roomState && (
        <div className="flex items-center justify-center min-w-[1500px] mx-auto h-screen overflow-hidden gap-x-10 font-ssrm font-bold">
          <div className="flex justify-between w-[1450px] h-[760px] px-8 py-10 rounded-3xl bg-[#1E3411]/40">
            <div className="relative w-[840px] flex flex-col">
              {!derived.isSolo && (
                <>
                  <TeamTab
                    position="top"
                    teamId={derived.topTeamId as 'BLUE' | 'RED'}
                    isMyTeam={me?.teamId === derived.topTeamId}
                    onClick={() =>
                      actions.handleChangeTeam(
                        derived.topTeamId as 'BLUE' | 'RED',
                      )
                    }
                  />
                  <TeamTab
                    position="bottom"
                    teamId={derived.bottomTeamId as 'BLUE' | 'RED'}
                    isMyTeam={me?.teamId === derived.bottomTeamId}
                    onClick={() =>
                      actions.handleChangeTeam(
                        derived.bottomTeamId as 'BLUE' | 'RED',
                      )
                    }
                  />
                </>
              )}

              <div className="w-full h-full rounded-3xl bg-gray-300/40 flex flex-col overflow-hidden">
                <TeamSection
                  gradient={topGradient}
                  players={derived.topTeamPlayers}
                  hostId={roomState.hostId}
                  amIHost={derived.amIHost}
                  myUserId={me?.userId ?? ''}
                  onKick={actions.handleKick}
                  onNudge={actions.handleNudge}
                />
                <TeamSection
                  gradient={bottomGradient}
                  players={derived.bottomTeamPlayers}
                  hostId={roomState.hostId}
                  amIHost={derived.amIHost}
                  myUserId={me?.userId ?? ''}
                  onKick={actions.handleKick}
                  onNudge={actions.handleNudge}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between w-[560px] p-5 rounded-3xl">
              <RoomDashboard onUpdateStatus={actions.updateStatus} />

              <RoomActionButtons
                amIHost={derived.amIHost}
                canStartGame={derived.canStartGame}
                isReady={!!me?.isReady}
                onMainAction={actions.handleMainAction}
                onLeave={actions.handleLeave}
              />
            </div>
          </div>
        </div>
      )}
    </RoomEntryGuard>
  );
};

export default RoomPage;
