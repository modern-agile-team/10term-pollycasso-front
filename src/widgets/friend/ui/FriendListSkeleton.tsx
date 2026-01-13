export const FriendCardSkeleton = () => {
  return (
    <div className="flex justify-between p-4 lg:p-5 h-24 lg:h-28 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-x-3 lg:gap-x-4 w-full">
        <div className="shrink-0 w-16 h-16 lg:w-18 lg:h-18 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex flex-col justify-center gap-y-2">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-x-2">
            <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
      <div className="shrink-0 w-8 h-8 rounded-full bg-gray-200 animate-pulse mt-1" />
    </div>
  );
};

export const FriendListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <FriendCardSkeleton key={i} />
      ))}
    </div>
  );
};
