interface CreateRoomButtonProps {
  onClick: () => void;
}

export const CreateRoomButton = ({ onClick }: CreateRoomButtonProps) => {
  return (
    <div className="flex ml-1 p-1 rounded-xl bg-white/20">
      <button
        onClick={onClick}
        className="px-5 rounded-lg bg-black text-white text-2xl"
      >
        방만들기
      </button>
    </div>
  );
};
