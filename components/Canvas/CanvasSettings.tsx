import React, { useState, useEffect, useCallback } from "react";
import { BlockPicker, ColorResult } from "react-color";
import * as fabric from "fabric"; // v6
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface SettingsProps {
  canvas: fabric.Canvas | null;
}

type SelectedObject = fabric.Object | null;

export default function Settings({ canvas }: SettingsProps) {
  const [selectedObject, setSelectedObject] = useState<SelectedObject>(null);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [color, setColor] = useState<string>("#000");
  const [fontSize, setFontSize] = useState<number>(20);
  const [isBold, setIsBold] = useState<boolean>(false);

  const handleObjectSelection = useCallback(
    (object: fabric.Object | undefined) => {
      if (!object) return;

      setSelectedObject(object);

      if (object.type === "rect") {
        const rect = object as fabric.Rect;
        setWidth(Math.round(rect.width! * rect.scaleX!).toString());
        setHeight(Math.round(rect.height! * rect.scaleY!).toString());
        setColor(rect.fill as string);
        setDiameter("");
      } else if (object.type === "circle") {
        const circle = object as fabric.Circle;
        setDiameter(Math.round(circle.radius! * 2 * circle.scaleX!).toString());
        setColor(circle.fill as string);
        setWidth("");
        setHeight("");
      } else if (object.type === "i-text") {
        const text = object as fabric.IText;
        setColor(text.fill as string);
        setFontSize(text.fontSize as number);
        setIsBold(text.fontWeight === "bold");
      }
    },
    []
  );

  const handleSelection = useCallback(
    (event: fabric.TEvent) => {
      const selected = (event as fabric.TEvent<fabric.TObjectSelectionEvent>)
        .selected?.[0];
      handleObjectSelection(selected);
    },
    [handleObjectSelection]
  );

  const clearSettings = useCallback(() => {
    setWidth("");
    setHeight("");
    setColor("");
    setDiameter("");
    setFontSize(20);
    setIsBold(false);
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:updated", handleSelection);
      canvas.on("selection:cleared", () => {
        setSelectedObject(null);
        clearSettings();
      });
      canvas.on("object:modified", (event) => {
        handleObjectSelection(event.target);
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created", handleSelection);
        canvas.off("selection:updated", handleSelection);
        canvas.off("selection:cleared");
        canvas.off("object:modified");
      }
    };
  }, [canvas, handleSelection, handleObjectSelection, clearSettings]);

  const handleWidthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/,/g, "");
      const intValue = parseInt(value, 10);

      setWidth(value);

      if (
        selectedObject &&
        selectedObject.type === "rect" &&
        !isNaN(intValue) &&
        intValue >= 0
      ) {
        (selectedObject as fabric.Rect).set({
          width: intValue / selectedObject.scaleX!,
        });
        canvas?.renderAll();
      }
    },
    [selectedObject, canvas]
  );

  const handleHeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/,/g, "");
      const intValue = parseInt(value, 10);

      setHeight(value);

      if (
        selectedObject &&
        selectedObject.type === "rect" &&
        !isNaN(intValue) &&
        intValue >= 0
      ) {
        (selectedObject as fabric.Rect).set({
          height: intValue / selectedObject.scaleY!,
        });
        canvas?.renderAll();
      }
    },
    [selectedObject, canvas]
  );

  const handleDiameterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/,/g, "");
      const intValue = parseInt(value, 10);

      setDiameter(value);

      if (
        selectedObject &&
        selectedObject.type === "circle" &&
        !isNaN(intValue) &&
        intValue >= 0
      ) {
        (selectedObject as fabric.Circle).set({
          radius: intValue / 2 / selectedObject.scaleX!,
        });
        canvas?.renderAll();
      }
    },
    [selectedObject, canvas]
  );

  const handleColorChange = useCallback(
    (color: ColorResult) => {
      setColor(color.hex);

      if (selectedObject) {
        selectedObject.set({ fill: color.hex });
        canvas?.renderAll();
      }
    },
    [selectedObject, canvas]
  );

  const handleFontSizeChange = useCallback(
    (value: number[]) => {
      setFontSize(value[0]);

      if (selectedObject && selectedObject.type === "i-text") {
        (selectedObject as fabric.IText).set({ fontSize: value[0] });
        canvas?.renderAll();
      }
    },
    [selectedObject, canvas]
  );

  const handleBoldChange = useCallback(
    (checked: boolean) => {
      setIsBold(checked);

      if (selectedObject && selectedObject.type === "i-text") {
        (selectedObject as fabric.IText).set({
          fontWeight: checked ? "bold" : "normal",
        });
        canvas?.renderAll();
      }
    },
    [selectedObject, canvas]
  );

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 gap-2 flex flex-col bg-neutral-container p-6 rounded text-left empty:p-0">
      {selectedObject && selectedObject.type === "rect" && (
        <>
          <Label htmlFor="width">Width</Label>
          <Input id="width" value={width} onChange={handleWidthChange} />
          <Label htmlFor="height">Height</Label>
          <Input id="height" value={height} onChange={handleHeightChange} />
          <Label>Color</Label>
          <BlockPicker color={color} onChangeComplete={handleColorChange} />
        </>
      )}

      {selectedObject && selectedObject.type === "circle" && (
        <>
          <Label htmlFor="diameter">Diameter</Label>
          <Input
            id="diameter"
            value={diameter}
            onChange={handleDiameterChange}
          />
          <Label>Color</Label>
          <BlockPicker color={color} onChangeComplete={handleColorChange} />
        </>
      )}

      {selectedObject && selectedObject.type === "i-text" && (
        <>
          <Label>Color</Label>
          <BlockPicker color={color} onChangeComplete={handleColorChange} />
          <Label>Font Size</Label>
          <Slider
            value={[fontSize]}
            onValueChange={handleFontSizeChange}
            min={8}
            max={72}
            step={1}
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="bold-mode"
              checked={isBold}
              onCheckedChange={handleBoldChange}
            />
            <Label htmlFor="bold-mode">Bold</Label>
          </div>
        </>
      )}
    </div>
  );
}
