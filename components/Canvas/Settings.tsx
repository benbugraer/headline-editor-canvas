import React, { useState, useEffect, useCallback, useRef } from "react";
import { SketchPicker, ColorResult } from "react-color";
import * as fabric from "fabric"; // v6
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaUnderline,
  FaItalic,
} from "react-icons/fa";
import { FaBold } from "react-icons/fa6";
import { Button } from "../ui/button";
import clsx from "clsx";

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
  const [textFormatting, setTextFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    textAlign: "left" as fabric.TextAlign,
  });
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

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
        setTextFormatting({
          bold: text.fontWeight === "bold",
          italic: text.fontStyle === "italic",
          underline: text.underline || false,
          strikethrough: text.linethrough || false,
          textAlign: text.textAlign || "left",
        });
      } else if (object.type === "image") {
        const img = object as fabric.Image;
        setWidth(Math.round(img.width! * img.scaleX!).toString());
        setHeight(Math.round(img.height! * img.scaleY!).toString());
      }
    },
    []
  );

  const handleSelection = useCallback(
    (event: fabric.IEvent) => {
      const selected = (event as fabric.IEvent<fabric.IEvent>).selected?.[0];
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
    setTextFormatting({
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      textAlign: "left",
    });
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:updated", handleSelection);
      canvas.on("selection:created", handleSelection);
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
        (selectedObject.type === "rect" || selectedObject.type === "image") &&
        !isNaN(intValue) &&
        intValue >= 0
      ) {
        selectedObject.set({
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
        (selectedObject.type === "rect" || selectedObject.type === "image") &&
        !isNaN(intValue) &&
        intValue >= 0
      ) {
        selectedObject.set({
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

  const updateTextFormatting = (
    property: keyof typeof textFormatting,
    value: any
  ) => {
    if (selectedObject && selectedObject.type === "i-text") {
      const text = selectedObject as fabric.IText;

      switch (property) {
        case "bold":
          text.set({ fontWeight: value ? "bold" : "normal" });
          break;
        case "italic":
          text.set({ fontStyle: value ? "italic" : "normal" });
          break;
        case "underline":
          text.set({ underline: value });
          break;
        case "strikethrough":
          text.set({ linethrough: value });
          break;
        case "textAlign":
          text.set({ textAlign: value });
          break;
      }

      setTextFormatting((prev) => ({
        ...prev,
        [property]: value,
      }));

      canvas?.renderAll();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {selectedObject && (
        <div className="w-full text-primary p-2 flex items-center space-x-4 border-b border-primary">
          {(selectedObject.type === "rect" ||
            selectedObject.type === "image") && (
            <>
              <div className="flex items-center space-x-2">
                <Label htmlFor="width">W:</Label>
                <Input
                  id="width"
                  value={width}
                  onChange={handleWidthChange}
                  className="w-20"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="height">H:</Label>
                <Input
                  id="height"
                  value={height}
                  onChange={handleHeightChange}
                  className="w-20"
                />
              </div>
            </>
          )}

          {selectedObject.type === "circle" && (
            <div className="flex items-center space-x-2">
              <Label htmlFor="diameter">Diameter:</Label>
              <Input
                id="diameter"
                value={diameter}
                onChange={handleDiameterChange}
                className="w-20"
              />
            </div>
          )}

          {selectedObject.type === "i-text" && (
            <>
              <div className="flex items-center space-x-2">
                <Label htmlFor="fontSize">Font Size:</Label>
                <Input
                  id="fontSize"
                  value={fontSize === 0 ? "" : fontSize}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setFontSize(0);
                      return;
                    }
                    const intValue = parseInt(value, 10);
                    if (!isNaN(intValue)) {
                      setFontSize(intValue);
                      if (selectedObject && selectedObject.type === "i-text") {
                        (selectedObject as fabric.IText).set({
                          fontSize: intValue,
                        });
                        canvas?.renderAll();
                      }
                    }
                  }}
                  className="w-20"
                />
              </div>
              <div className="flex items-center space-x-2">
                {/* Bold Button */}
                <Button
                  id="bold-mode"
                  variant="ghost"
                  size="icon"
                  className={clsx(
                    "bg-transparent hover:bg-none",
                    textFormatting.bold && "bg-tertiary"
                  )}
                  onClick={() =>
                    updateTextFormatting("bold", !textFormatting.bold)
                  }
                >
                  <FaBold />
                </Button>

                {/* Italic Button */}
                <Button
                  id="italic-mode"
                  variant="ghost"
                  size="icon"
                  className={clsx(
                    "bg-transparent hover:bg-none",
                    textFormatting.italic && "bg-tertiary"
                  )}
                  onClick={() =>
                    updateTextFormatting("italic", !textFormatting.italic)
                  }
                >
                  <FaItalic />
                </Button>

                {/* Underline Button */}
                <Button
                  id="underline-mode"
                  variant="ghost"
                  size="icon"
                  className={clsx(
                    "bg-transparent hover:bg-none",
                    textFormatting.underline && "bg-tertiary"
                  )}
                  onClick={() =>
                    updateTextFormatting("underline", !textFormatting.underline)
                  }
                >
                  <FaUnderline />
                </Button>

                {/* Strikethrough Button */}
                <Button
                  id="strikethrough-mode"
                  variant="ghost"
                  size="icon"
                  className={clsx(
                    "bg-transparent hover:bg-none",
                    textFormatting.strikethrough && "bg-tertiary"
                  )}
                  onClick={() =>
                    updateTextFormatting(
                      "strikethrough",
                      !textFormatting.strikethrough
                    )
                  }
                >
                  <FaStrikethrough />
                </Button>

                {/* Text Alignment Buttons */}
                {["left", "center", "right", "justify"].map((align) => (
                  <Button
                    key={align}
                    id={`${align}-align-mode`}
                    variant="ghost"
                    size="icon"
                    className={clsx(
                      "bg-transparent hover:bg-none",
                      textFormatting.textAlign === align && "bg-tertiary"
                    )}
                    onClick={() => updateTextFormatting("textAlign", align)}
                  >
                    {align === "left" && <FaAlignLeft />}
                    {align === "center" && <FaAlignCenter />}
                    {align === "right" && <FaAlignRight />}
                    {align === "justify" && <FaAlignJustify />}
                  </Button>
                ))}
              </div>
            </>
          )}

          <div className="flex items-center space-x-2">
            <Label>Color:</Label>
            <Popover>
              <PopoverTrigger>
                <div
                  className="w-6 h-6 rounded-sm cursor-pointer border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              </PopoverTrigger>
              <PopoverContent className="p-0 w-full">
                <SketchPicker color={color} onChange={handleColorChange} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
}
