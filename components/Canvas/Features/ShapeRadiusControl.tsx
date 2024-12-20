import React, { memo } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { ShapeRadiusState } from "../types/effects.types";

interface ShapeRadiusControlProps {
  radius: ShapeRadiusState;
  onChange: (updates: Partial<ShapeRadiusState>) => void;
  isCircle: boolean;
}

export const ShapeRadiusControl = memo(
  ({ radius, onChange, isCircle }: ShapeRadiusControlProps) => (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <Label className="text-gray-700 font-medium">
          {isCircle ? "Daire Boyutu" : "Köşe Yuvarlaklığı"}
        </Label>
        <Switch
          checked={radius.enabled}
          onCheckedChange={(checked) => {
            onChange({ enabled: checked });
            if (!checked) onChange({ radius: 0 });
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
                onValueChange={(values) => onChange({ radius: values[0] })}
                max={100}
                step={1}
              />
            </div>
            <input
              type="number"
              value={radius.radius}
              onChange={(e) => onChange({ radius: Number(e.target.value) })}
              className="w-16 h-8 border border-gray-300 rounded px-2 text-sm"
              min="0"
              max="100"
            />
          </div>
        </div>
      )}
    </div>
  )
);

ShapeRadiusControl.displayName = "ShapeRadiusControl";
