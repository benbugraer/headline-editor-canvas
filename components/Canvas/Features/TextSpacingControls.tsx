import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { Input } from "../../ui/input";
import { FaTextHeight } from "react-icons/fa";
import { Button } from "../../ui/button";

interface TextSpacingControlsProps {
  lineHeight: number;
  letterSpacing: number;
  onLineHeightChange: (value: number) => void;
  onLetterSpacingChange: (value: number) => void;
}

export function TextSpacingControls({
  lineHeight,
  letterSpacing = 0,
  onLineHeightChange,
  onLetterSpacingChange,
}: TextSpacingControlsProps) {
  const handleLetterSpacingInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= -50 && value <= 250) {
      onLetterSpacingChange(value);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <FaTextHeight className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Satır Aralığı</Label>
              <span className="text-sm text-muted-foreground">
                {lineHeight.toFixed(1)}
              </span>
            </div>
            <Slider
              value={[lineHeight]}
              min={0.5}
              max={12}
              step={0.1}
              onValueChange={(value) => onLineHeightChange(value[0])}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Harf Aralığı</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={letterSpacing}
                  onChange={handleLetterSpacingInputChange}
                  className="w-[70px]"
                  min={-50}
                  max={250}
                />
                <span className="text-sm text-muted-foreground">px</span>
              </div>
            </div>
            <Slider
              value={[letterSpacing]}
              min={-50}
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
