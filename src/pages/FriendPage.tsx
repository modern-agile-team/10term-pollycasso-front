import { FriendHeader, FriendList } from '@/widgets/friend';

const FriendPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 md:p-12 font-ssrm font-bold ">
      <div className="w-full max-w-[1500px] min-w-[768px] h-[760px] flex flex-col rounded-3xl bg-[#1E3411]/40 overflow-hidden px-5">
        <FriendHeader />

        <FriendList />
      </div>
    </div>
  );
};

export default FriendPage;
