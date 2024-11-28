import { PopoverContent } from "@/components/ui/popover";
import { HEADLINE_SIZES } from "../utils/constants";
import { Canvas } from "fabric";

interface HeadlineSelectorProps {
  canvas: Canvas | null;
}

export function HeadlineSelector({ canvas }: HeadlineSelectorProps) {
  const handleSizeSelect = (width: number, height: number) => {
    if (!canvas) return;
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.renderAll();
  };

  return (
    <PopoverContent className="w-60 mt-[8rem] ml-3" side="right">
      <div className="space-y-2">
        {Object.values(HEADLINE_SIZES).map((size) => (
          <button
            key={size.label}
            className="w-full p-2 text-left hover:bg-tertiary rounded-sm transition-colors"
            onClick={() => handleSizeSelect(size.width, size.height)}
          >
            <div className="text-sm font-medium">{size.label}</div>
            <div className="text-xs text-tertiary">
              {size.width}x{size.height}px
            </div>
          </button>
        ))}
      </div>
    </PopoverContent>
  );
}
