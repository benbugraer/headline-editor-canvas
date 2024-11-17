import React, { useEffect, useCallback } from "react";
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
import { Button } from "@/components/ui/button"; // Add this import

// import { LayerControls } from "../Features/LayerControls";
// import { layerManagement } from "../utils/LayerManagement";
import {
  Object as FabricObject,
  FabricObjectProps,
  ObjectEvents,
  SerializedObjectProps,
  TEvent,
  TPointerEvent,
} from "fabric";
import * as fabric from "fabric"; // v6

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

  useEffect(() => {
    if (!canvas) return;

    const handleSelection = (
      event: Partial<TEvent<TPointerEvent>> & {
        selected: FabricObject<
          Partial<FabricObjectProps>,
          SerializedObjectProps,
          ObjectEvents
        >[];
        deselected?: FabricObject<
          Partial<FabricObjectProps>,
          SerializedObjectProps,
          ObjectEvents
        >[];
      }
    ) => {
      const selected = event.selected;
      if (selected && selected.length > 0) {
        handleObjectSelection(selected[0]);
      } else {
        clearSettings();
      }
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", clearSettings);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // const handleAlignChange = useCallback(
  //   (align: "left" | "center" | "right" | "top" | "middle" | "bottom") => {
  //     if (!canvas || !selectedObject) return;
  //     if (typeof selectedObject !== "string") {
  //       layerManagement.alignObject(
  //         canvas,
  //         selectedObject as unknown as fabric.Object,
  //         align
  //       );
  //     }
  //   },
  //   [canvas, selectedObject]
  // );

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
          {/* <LayerControls
            onAlignChange={handleAlignChange}
            onLayerChange={function (): void {
              throw new Error("Function not implemented.");
            }}
          /> */}
        </div>
      ) : (
        <div className="h-full border-b border-transparent"></div>
      )}
    </div>
  );
}
