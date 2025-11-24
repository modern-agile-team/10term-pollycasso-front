import type { GameMode } from '@/entities/room';

interface GameModeSelectorProps {
  gameMode: GameMode | null;
  selectGameMode: (mode: GameMode) => void;
}

export const GameModeSelector = ({
  gameMode,
  selectGameMode,
}: GameModeSelectorProps) => {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-[#73ABFF] text-white font-bold rounded-t-xl px-6 py-3">
        게임모드
      </span>

      <div className="mt-3 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => selectGameMode('SOLO')}
          className={`border-2 rounded-xl py-3 px-11 font-bold
            ${
              gameMode === 'SOLO'
                ? 'border-[#74A9FF] text-[#3182F6] bg-white'
                : 'border-transparent text-black bg-white/70'
            }`}
        >
          개인
        </button>

        <button
          type="button"
          onClick={() => selectGameMode('TEAM')}
          className={`border-2 rounded-xl py-3 px-11 font-bold
            ${
              gameMode === 'TEAM'
                ? 'border-[#74A9FF] text-[#3182F6] bg-white'
                : 'border-transparent text-black bg-white/70'
            }`}
        >
          팀
        </button>
      </div>

      <div className="w-[130px] h-[10px] rounded-b-full bg-[#73ABFF] mt-2" />
    </div>
  );
};
