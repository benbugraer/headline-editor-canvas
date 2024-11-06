import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontFamilies, type FontFamily } from "../lib/fonts";

interface FontFamilySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function FontFamilySelect({
  value,
  onValueChange,
}: FontFamilySelectProps) {
  const getCurrentFont = React.useCallback(
    (value: string): FontFamily | undefined =>
      fontFamilies.find((font) => font.family === value || font.name === value),
    []
  );

  const currentFont = getCurrentFont(value);

  return (
    <Select value={currentFont?.name ?? value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          {currentFont ? (
            <span style={{ fontFamily: currentFont.family }}>
              {currentFont.name}
            </span>
          ) : (
            "Select font"
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {fontFamilies.map((font) => (
          <SelectItem
            key={font.name}
            value={font.name}
            style={{ fontFamily: font.family }}
          >
            {font.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
