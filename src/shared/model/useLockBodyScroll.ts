import { useLayoutEffect } from 'react';

/**
 * 컴포넌트가 마운트될 때 Body의 스크롤을 잠그고, 언마운트될 때 복구하는 Hook입니다.
 *
 * @description
 * - `overflow: hidden`을 통해 스크롤을 방지합니다.
 * - 스크롤바가 사라지면서 발생하는 레이아웃 시프트(덜컹거림)를 방지하기 위해
 * 현재 스크롤바의 너비만큼 `padding-right`를 보정합니다.
 * - `useLayoutEffect`를 사용하여 깜빡임 없이 스타일을 적용합니다.
 *
 * @example
 * ```tsx
 * // 모달 컴포넌트 내부에서 호출
 * useLockBodyScroll();
 * ```
 */
export const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    // 1. 현재 스타일 저장 (prev)
    const originalStyle = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // 2. 패딩 처리를 위한 너비 계산 (스크롤바 사라지면 덜컹거리는 현상 방지)
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // 3. 스타일 적용
    document.body.style.overflow = 'hidden';

    // 스크롤바가 실제로 존재했던 경우에만 패딩 보정
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // 4. 클린업
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);
};
