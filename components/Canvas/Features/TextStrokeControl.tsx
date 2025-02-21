import React, { memo } from "react";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import { ColorPicker } from "./ColorPicker";
import type { TextStrokeState } from "../types/effects.types";

interface TextStrokeControlProps {
  stroke: TextStrokeState;
  onChange: (updates: Partial<TextStrokeState>) => void;
}

export const TextStrokeControl = memo(
  ({ stroke, onChange }: TextStrokeControlProps) => (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <Label className="text-gray-700 font-medium">Metin Çizgisi</Label>
        <Switch
          checked={stroke.enabled}
          onCheckedChange={(checked) => onChange({ enabled: checked })}
          className="data-[state=checked]:bg-blue-500"
        />
      </div>

      {stroke.enabled && (
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={stroke.width}
            onChange={(e) =>
              onChange({ width: parseFloat(e.target.value) || 0 })
            }
            className="w-16 border border-gray-300 rounded px-2 py-1"
            min="0"
            max="20"
          />
          <ColorPicker
            color={stroke.color}
            onChange={(color) => onChange({ color: color.hex })}
          />
        </div>
      )}
    </div>
  )
);

TextStrokeControl.displayName = "TextStrokeControl";
