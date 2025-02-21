import React from "react";
import { HEADLINE_SIZES } from "../utils/constants";
import { Canvas } from "fabric";

interface HeadlineSelectorProps {
  canvas: Canvas | null;
  onSelect: () => void;
}

export function HeadlineSelector({ canvas, onSelect }: HeadlineSelectorProps) {
  const handleSizeSelect = (width: number, height: number) => {
    if (!canvas) return;
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.renderAll();
  };

  return (
    <div className="">
      <div>
        {Object.values(HEADLINE_SIZES).map((size) => (
          <button
            key={size.label}
            className="w-full p-3 text-left hover:bg-tertiary rounded-sm transition-colors"
            onSelect={onSelect}
            onClick={() => handleSizeSelect(size.width, size.height)}
          >
            <div className="text-sm font-medium">{size.label}</div>
            <div className="text-xs text-tertiary">
              {size.width}x{size.height}px
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
