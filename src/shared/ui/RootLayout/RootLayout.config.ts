import { Background, BackgroundMain, BackgroundShop } from '@/assets';

interface BgConfig {
  image: string;
  isDark?: boolean;
}

export const ROUTE_CONFIG: Record<string, BgConfig> = {
  '/login': { image: Background, isDark: true },
  '/signup': { image: Background, isDark: true },
  '/welcome': { image: Background, isDark: false },
  '/shop': { image: BackgroundShop, isDark: false },
  default: { image: BackgroundMain, isDark: false },
};
