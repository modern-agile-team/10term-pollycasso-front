const SPINNER_SIZES = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
} as const;

type SpinnerSize = keyof typeof SPINNER_SIZES;

export interface SpinnerStyleProps {
  fixed: boolean;
  overlay: boolean;
  transparent: boolean;
  size: SpinnerSize;
}

export const getSpinnerStyles = ({
  fixed,
  overlay,
  transparent,
  size,
}: SpinnerStyleProps) => {
  let positionClass = 'w-full py-10';
  if (fixed) {
    positionClass = 'fixed inset-0 z-[9999]';
  } else if (overlay) {
    positionClass = 'absolute inset-0 z-50';
  }

  const showBackground = (fixed || overlay) && !transparent;
  const bgClass = showBackground ? 'bg-white/80 backdrop-blur-[2px]' : '';

  const iconSizeClass = SPINNER_SIZES[size];

  return {
    positionClass,
    bgClass,
    iconSizeClass,
  };
};
