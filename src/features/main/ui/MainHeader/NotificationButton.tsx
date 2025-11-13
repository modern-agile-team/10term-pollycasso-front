import { BellIcon } from '@heroicons/react/24/solid';

export const NotificationButton = () => {
  return (
    <button className="flex items-center mx-5">
      <BellIcon className="w-8 h-8 text-white cursor-pointer" />
    </button>
  );
};
