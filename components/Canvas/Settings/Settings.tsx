import React, { useEffect, useCallback } from "react";
import * as fabric from "fabric"; // v6
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useObjectSelection } from "../hooks/useObjectSelection";
import { useTextFormatting } from "../hooks/useTextFormatting";
import { DimensionInputs } from "../Features/DimensionInputs";
import { ColorPicker } from "../Features/ColorPicker";
import { TextFormattingControls } from "../Features/TextFormattingControls";
import { FontFamilySelect } from "../Features/FontFamilySelect";
import { fontFamilies } from "../lib/fonts";
import { LayerControls } from "../Features/LayerControls";
import { layerManagement } from "../utils/LayerManagement";
import { Canvas, Object as FabricObject } from "fabric/fabric-impl";

interface SettingsProps {
  canvas: Canvas | null;
}

export default function Settings({ canvas }: SettingsProps) {
  const {
    selectedObject,
    width,
    height,
    diameter,
    color,
    fontSize,
    fontFamily,
    handleObjectSelection,
    handleWidthChange,
    handleHeightChange,
    handleDiameterChange,
    handleColorChange,
    handleFontSizeChange,
    handleFontFamilyChange,
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

    const handleSelection = (event: any) => {
      const selected = event.selected?.[0] as FabricObject;
      if (selected) {
        handleObjectSelection(selected);
      } else {
        clearSettings();
      }
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", clearSettings);
    canvas.on("object:modified", (event: any) =>
      handleObjectSelection(event.target as FabricObject)
    );

    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
      canvas.off("selection:cleared", clearSettings);
      canvas.off("object:modified");
    };
  }, [canvas, handleObjectSelection, clearSettings]);

  const handleAlignChange = useCallback(
    (align: "left" | "center" | "right" | "top" | "middle" | "bottom") => {
      if (!canvas || !selectedObject) return;
      layerManagement.alignObject(canvas, selectedObject, align);
    },
    [canvas, selectedObject]
  );

  return (
    <div className="w-full h-[60px] overflow-hidden">
      {selectedObject ? (
        <div className="min-w-[60px] border-b border-primary transition-all duration-300 text-primary p-2 flex items-center space-x-4">
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
              <FontFamilySelect
                value={fontFamily}
                onValueChange={(newFont) => {
                  const selectedFontFamily = fontFamilies.find(
                    (font) => font.name === newFont
                  )?.family;
                  handleFontFamilyChange(selectedFontFamily || newFont);
                }}
              />
              <TextFormattingControls
                textFormatting={textFormatting}
                updateTextFormatting={updateTextFormatting}
              />
            </>
          )}

          <ColorPicker color={color} onChange={handleColorChange} />
          <LayerControls onAlignChange={handleAlignChange} />
        </div>
      ) : (
        <div className="h-full border-b border-transparent"></div>
      )}
    </div>
  );
}
