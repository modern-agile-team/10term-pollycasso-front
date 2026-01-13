import { DRAWING_COLORS } from '../constants/drawingConstants';
import { isWhiteColor } from '../utils/colorUtils';

interface ColorPaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  activeColor: string;
}

export const ColorPalette = ({
  selectedColor,
  onSelectColor,
  activeColor,
}: ColorPaletteProps) => {
  return (
    <div className="grid grid-cols-7 gap-x-2.5 gap-y-2">
      {DRAWING_COLORS.map((color) => {
        const isSelected = selectedColor === color;
        const isWhite = isWhiteColor(color);

        const ringShadow = isSelected ? `0 0 0 2px ${activeColor}` : '';
        const innerShadow = isWhite ? 'inset 0 0 3px rgba(0,0,0,0.2)' : '';
        const combinedShadow =
          [ringShadow, innerShadow].filter(Boolean).join(', ') || 'none';

        return (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            className="w-4 h-4 rounded-full transition-transform focus:outline-none"
            style={{
              backgroundColor: color,
              border: isWhite && !isSelected ? '1px solid #E5E7EB' : 'none',
              boxShadow: combinedShadow,
              transform: isSelected ? 'scale(1.3)' : 'scale(1)',
            }}
            aria-label={`Select color ${color}`}
          />
        );
      })}
    </div>
  );
};
