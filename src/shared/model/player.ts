export type WaitingStatus = 'IDLE' | 'SHOPPING' | 'CUSTOMIZING';

export interface Outfit {
  bird: string;
  accessory: string | null;
  hat: string | null;
  top: string | null;
  bottom: string | null;
  shoes: string | null;
  effect: string | null;
}

export interface GameItem {
  itemId: string;
  count: number;
  cooldownEndsAt: number;
}

export interface Player {
  userId: string;
  nickname: string;
  level: number;
  exp: number;
  coins: number;
  outfit: Outfit;
  status: WaitingStatus;
  teamId: string | null;

  isConnected: boolean;
  isReady: boolean;

  totalScore: number;

  inventory: GameItem[];
}

export interface PlayerResult {
  rank: number;
  expGained: number;
  coinsGained: number;
  didLevelUp: boolean;
}

export interface ItemMeta {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  category: string;
  effect?: string;
}

export interface InventoryUIItem extends ItemMeta {
  count: number;
  cooldownEndsAt: number;
  isOwned: boolean;
}
