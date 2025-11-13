import { useNavigate } from 'react-router';

interface CreateConfirmButtonProps {
  canCreate: boolean | null;
}

export const CreateConfirmButton = ({
  canCreate,
}: CreateConfirmButtonProps) => {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = Math.floor(Math.random() * 9000) + 1000;
    navigate(`/rooms/${roomId}`);
  };

  return (
    <button
      type="button"
      disabled={!canCreate}
      onClick={createRoom}
      className={`w-[480px] h-[75px] mt-8 mb-6 text-white py-3 text-3xl rounded-xl
      ${canCreate ? 'bg-[#003D00] hover:bg-[#002E00]' : 'bg-[#7B9675] cursor-not-allowed'}`}
    >
      방만들기
    </button>
  );
};
