import React, { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useObjectSelection } from "../hooks/useObjectSelection";
import { useTextFormatting } from "../hooks/useTextFormatting";
import { DimensionInputs } from "../Features/DimensionInputs";
import { ColorPicker } from "../Features/ColorPicker";
import { TextFormattingControls } from "../Features/TextFormattingControls";
import { FontFamilySelect } from "../Features/FontFamilySelect";
import { fontFamilies } from "../lib/fonts";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useCanvasEvents } from "../hooks/useCanvasEvents"; // New custom hook
import * as fabric from "fabric";

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

  const handleDeleteObject = useCallback(() => {
    if (canvas && selectedObject) {
      if (Array.isArray(selectedObject)) {
        selectedObject.forEach((obj) => canvas.remove(obj));
      } else {
        canvas.remove(selectedObject);
      }
      clearSettings();
    }
  }, [canvas, selectedObject, clearSettings]);

  useCanvasEvents(canvas, handleObjectSelection, clearSettings); // Use custom hook

  return (
    <div className="w-full h-[60px] overflow-hidden">
      {selectedObject ? (
        <div className="min-w-[60px] border-b bg-secondary border-primary transition-all duration-300 text-primary p-2 flex items-center space-x-4">
          <ColorPicker color={color} onChange={handleColorChange} />

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

          <Button
            onClick={handleDeleteObject}
            disabled={!selectedObject}
            className="p-2"
            variant="outline"
            size="icon"
          >
            <FiTrash2 className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <div className="h-full border-b border-transparent"></div>
      )}
    </div>
  );
}
