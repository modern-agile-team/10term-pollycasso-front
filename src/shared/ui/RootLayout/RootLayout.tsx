import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import type { LeafData } from '@/shared/lib';
import { cn, createLeafData } from '@/shared/lib';
import { Leaf } from '@/shared/ui/Leaf';
import { ROUTE_CONFIG } from '@/shared/ui/RootLayout/RootLayout.config';

export const RootLayout = () => {
  const { pathname } = useLocation();
  const [leafData, setLeafData] = useState<LeafData[]>([]);

  const LEAF_COUNT = 8;

  const currentConfig = ROUTE_CONFIG[pathname] || ROUTE_CONFIG['default'];

  useEffect(() => {
    setLeafData(
      createLeafData(LEAF_COUNT, window.innerWidth, window.innerHeight),
    );
  }, []);

  return (
    <div className="relative w-screen min-h-screen overflow-hidden">
      <div
        className={cn(
          'absolute inset-0 z-0 bg-center bg-cover transition-all duration-700 ease-out',
          currentConfig.isDark ? 'brightness-75' : 'brightness-100',
        )}
        style={{ backgroundImage: `url(${currentConfig.image})` }}
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
