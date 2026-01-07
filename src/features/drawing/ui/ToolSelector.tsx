import type { ComponentProps } from 'react';
import {
  BeakerIcon,
  PaintBrushIcon,
  PencilIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';

import { DRAWING_TOOLS } from '../constants/drawingConstants';

export type DrawingToolType = (typeof DRAWING_TOOLS)[number]['id'];

type IconProps = ComponentProps<'svg'>;

const TOOL_ICONS = {
  PencilIcon: (props: IconProps) => <PencilIcon {...props} />,
  PaintBrushIcon: (props: IconProps) => <PaintBrushIcon {...props} />,
  SparklesIcon: (props: IconProps) => <SparklesIcon {...props} />,
  BeakerIcon: (props: IconProps) => <BeakerIcon {...props} />,
};

interface ToolSelectorProps {
  activeTool: DrawingToolType;
  onSelectTool: (toolId: DrawingToolType) => void;
  activeColor: string;
}

export const ToolSelector = ({
  activeTool,
  onSelectTool,
  activeColor,
}: ToolSelectorProps) => {
  return (
    <div className="flex flex-none gap-x-3">
      {DRAWING_TOOLS.map((tool) => {
        const isActive = activeTool === tool.id;
        const IconComponent = TOOL_ICONS[tool.Icon as keyof typeof TOOL_ICONS];

        if (!IconComponent) return null;

        return (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className="w-14 h-14 bg-white rounded-xl flex justify-center items-center cursor-pointer hover:bg-gray-100 shadow-sm transition-all"
            style={{
              boxShadow: isActive ? `0 0 0 3px ${activeColor}` : 'none',
            }}
            aria-label={`Select ${tool.id}`}
          >
            <IconComponent className="w-8 h-8 text-[#909090]" />
          </button>
        );
      })}
    </div>
  );
};
