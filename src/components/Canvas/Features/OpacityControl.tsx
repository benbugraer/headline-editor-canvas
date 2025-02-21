// OpacityControl.tsx
import React, { memo } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { ControlProps } from "../../types/effects.types";

export const OpacityControl = memo(
  ({ value, enabled, onChange, onToggle }: ControlProps) => (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <Label className="text-gray-700 font-medium">Opaklık</Label>
        <Switch
          checked={enabled}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-blue-500"
        />
      </div>
      {enabled && (
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          max={100}
          step={1}
          className="mt-2"
        />
      )}
    </div>
  )
);

OpacityControl.displayName = "OpacityControl";
