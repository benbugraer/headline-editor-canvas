import React from "react";
import { SketchPicker, ColorResult } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  color: string;
  onChange: (color: ColorResult) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Label>Renk:</Label>
      <Popover>
        <PopoverTrigger>
          <div
            className="w-6 h-6 rounded-sm cursor-pointer border border-gray-300"
            style={{ backgroundColor: color }}
          />
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full">
          <SketchPicker color={color} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
