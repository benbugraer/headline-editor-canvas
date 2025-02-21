// ShadowControl.tsx
import React, { memo } from "react";
import { Slider } from "../../ui/slider";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import { ColorPicker } from "./ColorPicker";
import type { ShadowState } from "../types/effects.types";

interface ShadowControlProps {
  shadow: ShadowState;
  onChange: (updates: Partial<ShadowState>) => void;
}

export const ShadowControl = memo(
  ({ shadow, onChange }: ShadowControlProps) => (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <Label className="text-gray-700 font-medium">Gölge Efekti</Label>
        <Switch
          checked={shadow.enabled}
          onCheckedChange={(checked) => onChange({ enabled: checked })}
          className="data-[state=checked]:bg-blue-500"
        />
      </div>

      {shadow.enabled && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-600 text-sm">Bulanıklık</Label>
            <Slider
              value={[shadow.blur]}
              onValueChange={(values) => onChange({ blur: values[0] })}
              max={50}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <ColorPicker
              color={shadow.color}
              onChange={(color) => onChange({ color: color.hex })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600 text-sm">X Kaydırma</Label>
            <Slider
              value={[shadow.offsetX]}
              onValueChange={(values) => onChange({ offsetX: values[0] })}
              min={-20}
              max={20}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600 text-sm">Y Kaydırma</Label>
            <Slider
              value={[shadow.offsetY]}
              onValueChange={(values) => onChange({ offsetY: values[0] })}
              min={-20}
              max={20}
              step={1}
            />
          </div>
        </div>
      )}
    </div>
  )
);

ShadowControl.displayName = "ShadowControl";
