import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DimensionInputsProps {
  objectType: string;
  width: string;
  height: string;
  diameter: string;
  onWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDiameterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DimensionInputs: React.FC<DimensionInputsProps> = ({
  objectType,
  width,
  height,
  diameter,
  onWidthChange,
  onHeightChange,
  onDiameterChange,
}) => {
  if (objectType === "rect" || objectType === "image") {
    return (
      <>
        <div className="flex items-center space-x-2">
          <Label htmlFor="width">W:</Label>
          <Input
            id="width"
            value={width}
            onChange={onWidthChange}
            className="w-20"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="height">H:</Label>
          <Input
            id="height"
            value={height}
            onChange={onHeightChange}
            className="w-20"
          />
        </div>
      </>
    );
  }

  if (objectType === "circle") {
    return (
      <div className="flex items-center space-x-2">
        <Label htmlFor="diameter">Diameter:</Label>
        <Input
          id="diameter"
          value={diameter}
          onChange={onDiameterChange}
          className="w-20"
        />
      </div>
    );
  }

  return null;
};
