import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import { Background, BackgroundMain } from '@/assets';
import type { LeafData } from '@/shared/lib';
import { cn, createLeafData } from '@/shared/lib';
import { Leaf } from '@/shared/ui/Leaf';

export const RootLayout = () => {
  const { pathname } = useLocation();
  const [leafData, setLeafData] = useState<LeafData[]>([]);

  const AUTH_PAGES = ['/login', '/signup'];
  const WELCOME_PAGE = '/welcome';
  const LEAF_COUNT = 8;

  const isDark = AUTH_PAGES.includes(pathname);
  const isWelcome = pathname === WELCOME_PAGE;
  const isMain = !isDark && !isWelcome;

  useEffect(() => {
    setLeafData(
      createLeafData(LEAF_COUNT, window.innerWidth, window.innerHeight),
    );
  }, []);

  const bgImage = isMain ? BackgroundMain : Background;

  return (
    <div className="relative w-screen min-h-screen overflow-hidden">
      <div
        className={cn(
          'absolute inset-0 z-0 bg-center bg-cover transition-all duration-700 ease-out',
          isDark ? 'brightness-75' : 'brightness-100',
        )}
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {leafData.map((leaf, index) => (
        <Leaf key={index} {...leaf} />
      ))}

      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
};
