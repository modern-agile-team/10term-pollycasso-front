import { useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  FaceSmileIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { FaceFrownIcon, XMarkIcon } from '@heroicons/react/24/solid';

import { Title } from '@/assets';
import { RecommendedFriendCard } from '@/entities/friend/ui/RecommendedFriendCard';
import { useFriend } from '@/entities/friend';
import { useSound } from '@/entities/sound';
import { SoundManager } from '@/shared/api/sound/manager';
import { SOUND_ASSETS } from '@/shared/api/sound/assets';

interface AddFriendModalProps {
  onClose: () => void;
  initialRecommendedFriends: any[];
}

export const AddFriendModal = ({
  onClose,
  initialRecommendedFriends,
}: AddFriendModalProps) => {
  const { requestFriend, searchResults, searchUsers } = useFriend('');

  const { isMuted, sfxVolume } = useSound();

  const playClick = () => {
    if (!isMuted) {
      SoundManager.playSfx(SOUND_ASSETS.SFX.CLICK, sfxVolume);
    }
  };

  const [requestedIds, setRequestedIds] = useState<Set<number>>(new Set());
  const [searchInput, setSearchInput] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleRequestFriend = (userId: number) => {
    if (requestedIds.has(userId)) return;
    setRequestedIds((prev) => new Set(prev).add(userId));
    requestFriend(userId);
  };

  const handleSearch = () => {
    const trimmedKeyword = searchInput.trim();
    if (!trimmedKeyword) return;

    playClick();
    setIsSearchMode(true);
    searchUsers(trimmedKeyword);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === '') {
      setIsSearchMode(false);
      searchUsers('');
    }
  };

  const displayList = isSearchMode ? searchResults : initialRecommendedFriends;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/60 z-50 font-ssrm"
      onClick={() => {
        playClick();
        onClose();
      }}
    >
      <div
        className="relative bg-[#F2F2F2] w-[700px] p-6 rounded-2xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-4 right-4 bg-gray-300 rounded-md p-1 hover:bg-gray-400 transition-colors z-10"
        >
          <XMarkIcon className="w-8 h-8 text-white" />
        </button>

        <img src={Title} alt="Title" className="w-[450px] my-10" />

        <div className="flex items-center my-3 w-[510px] h-12 bg-white rounded-2xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-green-500 transition-all">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="친구의 태그(4자리)나 이름을 입력해주세요."
            autoComplete="off"
            className="flex-1 px-4 text-gray-500 text-xl outline-none placeholder:text-[#BABABA] font-light"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center w-16 h-full bg-[#D9D9D9] border-l border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="mt-3 w-[510px] flex flex-col font-bold">
          <div className="w-full rounded-t-2xl bg-[#153712] text-white text-xl px-4 py-1.5 font-light">
            {isSearchMode ? `'${searchInput}' 검색 결과` : '추천친구'}
          </div>

          <div className="w-full h-[350px] overflow-y-auto bg-[#E2E2E2] custom-scrollbar relative">
            {displayList && displayList.length > 0 ? (
              displayList.map((friend, index) => (
                <RecommendedFriendCard
                  key={friend.userId}
                  {...friend}
                  className={
                    index % 2 === 0 ? 'bg-[#D9D9D9]/20' : 'bg-[#D4D4D4]'
                  }
                  isRequested={requestedIds.has(friend.userId)}
                  onAdd={() => handleRequestFriend(friend.userId)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-y-3">
                {isSearchMode ? (
                  <>
                    <FaceFrownIcon className="w-16 h-16 text-gray-300" />
                    <span className="text-xl font-medium text-gray-500">
                      검색된 유저가 없어요.
                    </span>
                  </>
                ) : (
                  <>
                    <FaceSmileIcon className="w-16 h-16 text-gray-300" />
                    <span className="text-xl font-medium text-gray-500">
                      모든 친구를 사귀었어요!
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="mb-8 w-full rounded-b-2xl bg-[#153712] h-3" />
        </div>
      </div>
    </div>
  );
};
