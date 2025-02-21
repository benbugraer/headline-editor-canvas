import React, { useState } from "react";
import { SketchPicker } from "react-color";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="w-8 h-8 rounded-md border border-gray-300"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute z-10 mt-2">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <SketchPicker
            color={color}
            onChange={(color) => onChange(color.hex)}
          />
        </div>
      )}
    </div>
  );
};
