import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
import { Input } from "../ui/input";

interface CanvasSettingsProps {
  canvas?: {
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
    renderAll: () => void;
  };
}

const CanvasSettings: React.FC<CanvasSettingsProps> = ({ canvas }) => {
  const [canvasWidth, setCanvasWidth] = useState<string>("500");
  const [canvasHeight, setCanvasHeight] = useState<string>("500");

  const updateCanvasSize = useCallback(() => {
    if (canvas) {
      const width = parseInt(canvasWidth, 10);
      const height = parseInt(canvasHeight, 10);
      if (!isNaN(width) && !isNaN(height) && width >= 0 && height >= 0) {
        canvas.setWidth(width);
        canvas.setHeight(height);
        canvas.renderAll();
      }
    }
  }, [canvas, canvasWidth, canvasHeight]);

  useEffect(() => {
    updateCanvasSize();
  }, [updateCanvasSize]);

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(value)) {
      setCanvasWidth(value);
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(value)) {
      setCanvasHeight(value);
    }
  };

  return (
    <div className="flex gap-3">
      <Input
        value={canvasWidth}
        onChange={handleWidthChange}
        placeholder="Width"
        aria-label="Canvas Width"
        className="bg-secondary"
      />
      <Input
        value={canvasHeight}
        onChange={handleHeightChange}
        placeholder="Height"
        aria-label="Canvas Height"
        className="bg-secondary"
      />
    </div>
  );
};

export default CanvasSettings;
