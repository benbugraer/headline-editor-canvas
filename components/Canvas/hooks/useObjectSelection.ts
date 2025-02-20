import { useState, useCallback, useEffect } from "react";
import * as fabric from "fabric"; // v6
import { ColorResult } from "react-color";

export const useObjectSelection = (canvas: fabric.Canvas | null) => {
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(
    null
  );
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [color, setColor] = useState<string>("#000");
  const [fontSize, setFontSize] = useState<number>(20);
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [opacity, setOpacity] = useState<number>(100);
  const [lineHeight, setLineHeight] = useState<number>(1.2);
  const [letterSpacing, setLetterSpacing] = useState<number>(0);

  const handleObjectSelection = useCallback((object: fabric.Object | null) => {
    setSelectedObject(object);

    if (object) {
      // Mevcut opacity değerini 0-100 aralığına dönüştür
      setOpacity(object.opacity ? object.opacity * 100 : 100);
      if (object.type === "rect" || object.type === "image") {
        setWidth(Math.round(object.width! * object.scaleX!).toString());
        setHeight(Math.round(object.height! * object.scaleY!).toString());
        setColor(object.fill as string);
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
      }
    } else {
      // Reset all values when no object is selected
      setWidth("");
      setHeight("");
      setDiameter("");
      setColor("#000");
      setFontSize(20);
      setOpacity(100);
    }
  }, []);

  const handleOpacityChange = useCallback(
    (value: number) => {
      if (selectedObject) {
        // Opacity değerini 0-1 aralığına dönüştür
        const opacityValue = value / 100;

        setOpacity(value);
        selectedObject.set("opacity", opacityValue);
        canvas?.renderAll();
      }
    },
    [selectedObject, canvas]
  );

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
        selectedObject.set({ width: intValue / selectedObject.scaleX! });
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
        selectedObject.set({ height: intValue / selectedObject.scaleY! });
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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "") {
        setFontSize(0);
        return;
      }
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue)) {
        setFontSize(intValue);
        if (selectedObject && selectedObject.type === "i-text") {
          (selectedObject as fabric.IText).set({ fontSize: intValue });
          canvas?.renderAll();
        }
      }
    },
    [selectedObject, canvas]
  );

  const handleFontFamilyChange = useCallback(
    (newFontFamily: string) => {
      if (!selectedObject || !canvas) return;

      if (selectedObject.type === "i-text") {
        (selectedObject as fabric.IText).set("fontFamily", newFontFamily);
        canvas.requestRenderAll();
        setFontFamily(newFontFamily);
      }
    },
    [selectedObject, canvas]
  );

  const handleLineHeightChange = useCallback(
    (value: number) => {
      if (!selectedObject || !canvas) return;

      if (selectedObject.type === "i-text") {
        (selectedObject as fabric.IText).set("lineHeight", value);
        setLineHeight(value);
        canvas.renderAll();
      }
    },
    [canvas, selectedObject]
  );

  const handleLetterSpacingChange = useCallback(
    (value: number) => {
      if (!selectedObject || !canvas) return;

      if (selectedObject.type === "i-text") {
        // 0 normal aralık olacak
        // Negatif değerler (-50'ye kadar) harfleri yakınlaştıracak
        // Pozitif değerler (250'ye kadar) harfleri uzaklaştıracak
        let scaledValue;
        if (value < 0) {
          // -50 -> -100 (harfler birbirine çok yakın)
          scaledValue = (value / -50) * -500;
        } else if (value > 0) {
          // 0 -> 1000 (harfler birbirinden uzak)
          scaledValue = value * 25;
        } else {
          // 0 -> normal aralık
          scaledValue = 0;
        }

        (selectedObject as fabric.IText).set("charSpacing", scaledValue);
        setLetterSpacing(value);
        canvas.renderAll();
      }
    },
    [canvas, selectedObject]
  );

  useEffect(() => {
    if (selectedObject && selectedObject.type === "i-text") {
      const textObject = selectedObject as fabric.IText;
      setFontFamily(textObject.fontFamily || "Arial");
      setLineHeight(textObject.lineHeight || 1.2);
      setLetterSpacing(textObject.charSpacing || 0);
    }
  }, [selectedObject]);

  return {
    selectedObject,
    width,
    height,
    diameter,
    color,
    opacity,
    fontSize,
    fontFamily,
    lineHeight,
    letterSpacing,
    handleObjectSelection,
    handleWidthChange,
    handleHeightChange,
    handleDiameterChange,
    handleColorChange,
    handleFontSizeChange,
    handleFontFamilyChange,
    handleOpacityChange,
    handleLineHeightChange,
    handleLetterSpacingChange,
  };
};
