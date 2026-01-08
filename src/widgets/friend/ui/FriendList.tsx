import { FaceFrownIcon } from '@heroicons/react/24/outline';

import type { FriendRelation } from '@/entities/friend';
import { FriendCard } from '@/entities/friend';
import { useFriendList } from '../model/useFriendList';

interface FriendListProps {
  searchKeyword: string;
}

export const FriendList = ({ searchKeyword }: FriendListProps) => {
  const { processedFriends, acceptFriend, removeFriend, blockFriend } =
    useFriendList(searchKeyword);

  return (
    <div className="flex-1 px-5 pb-10 overflow-y-auto custom-scrollbar">
      {processedFriends.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {processedFriends.map((friend) => (
            <FriendCard
              key={friend.id}
              userId={friend.id}
              nickname={friend.nickname}
              level={friend.level}
              relation={friend.relation as FriendRelation}
              isOnline={friend.isOnline}
              onAccept={() => acceptFriend(friend.id)}
              onReject={() => removeFriend(friend.id)}
              onCancel={() => removeFriend(friend.id)}
              onDelete={() => removeFriend(friend.id)}
              onBlock={() => blockFriend(friend.id)}
              onUnblock={() => removeFriend(friend.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-white/50 gap-y-4">
          <FaceFrownIcon className="w-24 h-24 opacity-60" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white/80">
              검색된 친구가 없어요.
            </p>
            <p className="text-lg mt-1 font-light">
              닉네임이나 태그를 다시 확인해주세요!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
