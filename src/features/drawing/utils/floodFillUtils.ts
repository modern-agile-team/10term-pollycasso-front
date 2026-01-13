import type { RGBA } from '../model/types';
import {
  getPixelColor,
  hexToRgb,
  isColorMatch,
  isSameColor,
} from './colorUtils';
import { imageDataToImageElement } from './domUtils';

/**
 * 색상 오차 허용 범위 (0~255)
 * 높을수록 비슷한 색상까지 넓게 칠해집니다.
 */
const TOLERANCE = 50;

/**
 * ImageData의 특정 픽셀(index)을 지정된 색상(color)으로 변경합니다.
 * @param data - 픽셀 데이터 배열 (Uint8ClampedArray)
 * @param index - 변경할 픽셀의 시작 인덱스 (R값 위치)
 * @param color - 적용할 색상 (RGB)
 */
const fillPixel = (
  data: Uint8ClampedArray,
  index: number,
  color: Omit<RGBA, 'a'>,
) => {
  data[index] = color.r;
  data[index + 1] = color.g;
  data[index + 2] = color.b;
  data[index + 3] = 255; // Alpha는 항상 불투명(255)하게 설정
};

/**
 * 스택(Stack) 기반의 Flood Fill 알고리즘을 수행합니다.
 *
 * [구현 의도]
 * 재귀(Recursion) 방식은 이미지가 클 경우 'Maximum call stack size exceeded' 에러가
 * 발생할 위험이 있어, 안정적인 스택(Loop) 방식을 채택했습니다.
 *
 * @param imageData - 조작할 원본 이미지 데이터 (참조로 전달되어 직접 수정됨)
 * @param startX - 클릭한 위치의 X 좌표
 * @param startY - 클릭한 위치의 Y 좌표
 * @param fillColor - 채울 색상
 */
const applyFloodFill = (
  imageData: ImageData,
  startX: number,
  startY: number,
  fillColor: Omit<RGBA, 'a'>,
): void => {
  const { width, height, data } = imageData;

  // DFS 탐색을 위한 스택 초기화
  const stack = [[startX, startY]];

  // 2차원 (x, y) 좌표를 1차원 배열 인덱스로 변환
  const startPos = (startY * width + startX) * 4;
  const startColor = getPixelColor(data, startPos);

  // 최적화: 클릭한 색상이 이미 칠하려는 색상과 완벽히 같다면 연산 없이 종료
  if (isSameColor(startColor, fillColor)) {
    return;
  }

  // 방문 여부 체크 (메모리 효율을 위해 Uint8Array 사용)
  // 0: 방문 안 함, 1: 방문함
  const visited = new Uint8Array(width * height);

  while (stack.length) {
    const [x, y] = stack.pop()!;

    // 1차원 배열에서의 픽셀 위치 계산 (채널 제외한 순수 인덱스)
    const pos = y * width + x;

    if (visited[pos]) continue;
    visited[pos] = 1;

    // 실제 색상 데이터(RGBA)가 위치한 인덱스 (한 픽셀당 4바이트 차지하므로 * 4)
    const pixelIndex = pos * 4;
    const currentColor = getPixelColor(data, pixelIndex);

    // 색상 오차 범위 내에 들어오는지 확인
    if (isColorMatch(startColor, currentColor, TOLERANCE)) {
      fillPixel(data, pixelIndex, fillColor);

      // 상하좌우 4방향 탐색 및 유효 범위 검사
      if (x > 0) stack.push([x - 1, y]);
      if (x < width - 1) stack.push([x + 1, y]);
      if (y > 0) stack.push([x, y - 1]);
      if (y < height - 1) stack.push([x, y + 1]);
    }
  }
};

/**
 * 헥사 코드 색상으로 Flood Fill을 실행하고 결과를 새로운 이미지 엘리먼트로 반환합니다.
 */
export const performFloodFill = (
  originalImageData: ImageData,
  startX: number,
  startY: number,
  fillColorHex: string,
): HTMLImageElement | null => {
  const rgbColor = hexToRgb(fillColorHex);
  if (!rgbColor) return null;

  // 원본 데이터 보존을 위해 복사본 생성 (Side Effect 방지)
  const workingImageData = new ImageData(
    new Uint8ClampedArray(originalImageData.data),
    originalImageData.width,
    originalImageData.height,
  );

  applyFloodFill(workingImageData, startX, startY, rgbColor);

  return imageDataToImageElement(workingImageData);
};
