export interface Product {
  id: number;
  name: string;
  price: number;
  level: number;
  // TODO: 카테고리 적용, 카드 뒷면 UI에 설명 작성
  subCategory?: '새' | '상의' | '하의' | '모자' | '신발' | '액세서리' | '효과';
  description?: string;
  image: string;
  outfitImage?: string;
}
