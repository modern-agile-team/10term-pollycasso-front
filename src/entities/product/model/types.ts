export interface Product {
  id: number;
  name: string;
  price: number;
  level: number;
  // TODO: 카테고리 적용, 카드 뒷면 UI에 설명 작성
  subCategory?: string;
  description?: string;
  image: string;
  outfitImage?: string;
}
