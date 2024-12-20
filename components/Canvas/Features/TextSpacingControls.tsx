import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { LuTextCursor } from "react-icons/lu";

interface TextSpacingControlsProps {
  lineHeight: number;
  letterSpacing: number;
  onLineHeightChange: (value: number) => void;
  onLetterSpacingChange: (value: number) => void;
}

export function TextSpacingControls({
  lineHeight,
  letterSpacing,
  onLineHeightChange,
  onLetterSpacingChange,
}: TextSpacingControlsProps) {
  const handleLetterSpacingInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= -11 && value <= 250) {
      onLetterSpacingChange(value);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 hover:bg-accent rounded-md">
          <LuTextCursor className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Line Height</Label>
              <span className="text-sm text-muted-foreground">
                {lineHeight.toFixed(1)}
              </span>
            </div>
            <Slider
              value={[lineHeight]}
              min={0.5}
              max={3}
              step={0.1}
              onValueChange={(value) => onLineHeightChange(value[0])}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Letter Spacing</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={letterSpacing}
                  onChange={handleLetterSpacingInputChange}
                  className="w-[70px]"
                  min={-11}
                  max={250}
                />
                <span className="text-sm text-muted-foreground">px</span>
              </div>
            </div>
            <Slider
              value={[letterSpacing]}
              min={-11}
              max={250}
              step={1}
              onValueChange={(value) => onLetterSpacingChange(value[0])}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
