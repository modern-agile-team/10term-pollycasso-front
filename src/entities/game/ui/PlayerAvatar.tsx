const getLevelColor = (level: number) => {
  if (level >= 20) return 'bg-red-500';
  if (level >= 10) return 'bg-yellow-400';
  return 'bg-green-500';
};

export const PlayerAvatar = ({
  nickname,
  level,
  isConnected,
}: {
  nickname: string;
  level: number;
  isConnected: boolean;
}) => (
  <div
    className={`flex flex-col items-center transition-all duration-300 ${
      !isConnected ? 'grayscale opacity-50' : ''
    }`}
  >
    <div className="relative w-[70px] h-[70px] bg-white rounded-full mx-auto shadow-inner shadow-black/40">
      <div
        className={`absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 border-[#003D00] ${getLevelColor(level)}`}
      />
    </div>

    <p className="text-center mt-2 text-white font-bold truncate w-20">
      {nickname}
    </p>
  </div>
);
