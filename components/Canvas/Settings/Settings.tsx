import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useObjectSelection } from "../hooks/useObjectSelection";
import { useTextFormatting } from "../hooks/useTextFormatting";
import { DimensionInputs } from "../Features/DimensionInputs";
import { ColorPicker } from "../Features/ColorPicker";
import { TextFormattingControls } from "../Features/TextFormattingControls";
import { FontFamilySelect } from "../Features/FontFamilySelect";
import { fontFamilies } from "../lib/fonts";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "../../ui/button";
import { useCanvasEvents } from "../hooks/useCanvasEvents";
import * as fabric from "fabric";
import { ColorResult } from "react-color";
import { layerManagement } from "../utils/LayerManagement";
import { LayerControls } from "../Features/LayerControls";
// import TransparencyControl from "../Features/TransparencyControl";
import EffectsDrawer from "../Features/Effects";
import { TextSpacingControls } from "../Features/TextSpacingControls";

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
    // opacity,
    fontSize,
    fontFamily,
    handleObjectSelection,
    handleWidthChange,
    handleHeightChange,
    handleDiameterChange,
    handleColorChange,
    handleFontSizeChange,
    handleFontFamilyChange,
    // handleOpacityChange,
    lineHeight,
    letterSpacing,
    handleLineHeightChange,
    handleLetterSpacingChange,
  } = useObjectSelection(canvas);

  const { textFormatting, updateTextFormatting } = useTextFormatting(
    canvas,
    selectedObject
  );

  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");

  const clearSettings = useCallback(() => {
    handleObjectSelection(null);
  }, [handleObjectSelection]);

  const handleDeleteObject = useCallback(() => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();

    if (activeObjects.length > 0) {
      canvas.discardActiveObject();
      activeObjects.forEach((obj) => {
        canvas.remove(obj);
      });
    } else if (selectedObject) {
      canvas.remove(selectedObject);
    }

    canvas.requestRenderAll();
    clearSettings();
  }, [canvas, selectedObject, clearSettings]);

  useCanvasEvents(canvas, handleObjectSelection, clearSettings);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        handleDeleteObject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDeleteObject]);

  const handleBackgroundColorChange = (colorResult: ColorResult) => {
    const color = colorResult.hex;
    setBackgroundColor(color);
    if (canvas) {
      canvas.set("backgroundColor", color); // Doğru yöntem
      canvas.renderAll(); // Değişiklikleri uygula
    }
  };
  const handleAlignChange = useCallback(
    (align: "left" | "center" | "right" | "top" | "middle" | "bottom") => {
      if (!canvas || !selectedObject) return;
      layerManagement.alignObject(canvas, selectedObject, align);
    },
    [canvas, selectedObject]
  );
  const handleLayerChange = useCallback(
    (action: "up" | "down" | "top" | "bottom") => {
      if (!canvas || !selectedObject) return;

      switch (action) {
        case "up":
          layerManagement.moveObjectUp(canvas, selectedObject);
          break;
        case "down":
          layerManagement.moveObjectDown(canvas, selectedObject);
          break;
        case "top":
          layerManagement.moveObjectToTop(canvas, selectedObject);
          break;
        case "bottom":
          layerManagement.moveObjectToBottom(canvas, selectedObject);
          break;
      }
    },
    [canvas, selectedObject]
  );

  return (
    <div className="w-full overflow-hidden">
      {selectedObject ? (
        <div className="min-w-[60px] h-[60px] border-b bg-secondary border-primary transition-all duration-300 text-primary p-2 flex items-center space-x-4">
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
                <Label htmlFor="fontSize">Yazı Boyutu:</Label>
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
              <TextSpacingControls
                lineHeight={lineHeight}
                letterSpacing={letterSpacing || 0}
                onLineHeightChange={handleLineHeightChange}
                onLetterSpacingChange={handleLetterSpacingChange}
              />
            </>
          )}

          <LayerControls
            onAlignChange={handleAlignChange}
            onLayerChange={handleLayerChange}
          />
          {/* <TransparencyControl
            opacity={opacity}
            onOpacityChange={handleOpacityChange}
          /> */}
          <EffectsDrawer
            selectedObject={selectedObject}
            canvas={canvas}
            onObjectUpdate={() => {
              canvas?.renderAll();
            }}
          />
          <Button
            onClick={handleDeleteObject}
            disabled={!selectedObject}
            className="p-2 rounded-md"
            variant="destructive"
            size="icon"
          >
            <FiTrash2 />
          </Button>
        </div>
      ) : (
        <div className="min-w-[60px] h-[60px] border-b bg-secondary border-primary transition-all duration-300 text-primary p-2 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <ColorPicker
              color={backgroundColor}
              onChange={handleBackgroundColorChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
