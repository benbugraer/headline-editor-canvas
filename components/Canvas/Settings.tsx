import React, { useEffect, useCallback } from "react";
import * as fabric from "fabric"; // v6
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useObjectSelection } from "./hooks/useObjectSelection";
import { useTextFormatting } from "./hooks/useTextFormatting";
import { DimensionInputs } from "./DimensionInputs";
import { ColorPicker } from "./ColorPicker";
import { TextFormattingControls } from "./TextFormattingControls";

interface SettingsProps {
  canvas: fabric.Canvas | null;
}

export default function Settings({ canvas }: SettingsProps) {
  const {
    selectedObject,
    width,
    height,
    diameter,
    color,
    fontSize,
    handleObjectSelection,
    handleWidthChange,
    handleHeightChange,
    handleDiameterChange,
    handleColorChange,
    handleFontSizeChange,
  } = useObjectSelection(canvas);

  const { textFormatting, updateTextFormatting } = useTextFormatting(
    canvas,
    selectedObject
  );

  const clearSettings = useCallback(() => {
    handleObjectSelection(null);
  }, [handleObjectSelection]);

  useEffect(() => {
    if (!canvas) return;

    const handleSelection = (event: fabric.IEvent) => {
      const selected = (event as any).selected?.[0];
      if (selected) {
        handleObjectSelection(selected);
      } else {
        clearSettings();
      }
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", clearSettings);
    canvas.on("object:modified", (event) =>
      handleObjectSelection(event.target!)
    );

    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
      canvas.off("selection:cleared", clearSettings);
      canvas.off("object:modified");
    };
  }, [canvas, handleObjectSelection, clearSettings]);

  if (!selectedObject) return null;

  return (
    <div className="w-full h-[60px] overflow-hidden">
      <div className="w-full min-w-[60px] transition-all duration-300 text-primary p-2 flex items-center space-x-4">
        <DimensionInputs
          objectType={selectedObject.type}
          width={width}
          height={height}
          diameter={diameter}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
          onDiameterChange={handleDiameterChange}
        />

        {selectedObject.type === "i-text" && (
          <>
            <div className="flex items-center space-x-2">
              <Label htmlFor="fontSize">Font Size:</Label>
              <Input
                id="fontSize"
                value={fontSize === 0 ? "" : fontSize}
                onChange={handleFontSizeChange}
                className="w-20"
              />
            </div>
            <TextFormattingControls
              textFormatting={textFormatting}
              updateTextFormatting={updateTextFormatting}
            />
          </>
        )}

        <ColorPicker color={color} onChange={handleColorChange} />
      </div>
    </div>
  );
}
