import React, { memo } from "react";
import { Slider } from "../../ui/slider";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import type { CornerRadiusState } from "../types/effects.types";

interface ShapeRadiusControlProps {
  radius: CornerRadiusState;
  onChange: (updates: Partial<CornerRadiusState>) => void;
  isCircle: boolean;
}

export const ShapeRadiusControl = memo(
  ({ radius, onChange, isCircle }: ShapeRadiusControlProps) => {
    const handleRadiusChange = (value: number) => {
      // Radius değerini 0-140 arasında sınırla
      const clampedValue = Math.max(0, Math.min(140, value));
      onChange({ radius: clampedValue });
    };

    return (
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <Label className="text-gray-700 font-medium">
            {isCircle ? "Daire Boyutu" : "Köşe Yuvarlaklığı"}
          </Label>
          <Switch
            checked={radius.enabled}
            onCheckedChange={(checked) => {
              onChange({ enabled: checked });
              if (!checked) handleRadiusChange(0);
            }}
            className="data-[state=checked]:bg-blue-500"
          />
        </div>

        {radius.enabled && (
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Slider
                  value={[radius.radius]}
                  onValueChange={(values) => handleRadiusChange(values[0])}
                  max={140}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
              <input
                type="number"
                value={radius.radius}
                onChange={(e) => handleRadiusChange(Number(e.target.value))}
                className="w-16 h-8 border border-gray-300 rounded px-2 text-sm"
                min="0"
                max="140"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

ShapeRadiusControl.displayName = "ShapeRadiusControl";
