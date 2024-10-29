import { useState, useCallback } from "react";
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

  const handleObjectSelection = useCallback((object: fabric.Object | null) => {
    setSelectedObject(object);

    if (object) {
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
    }
  }, []);

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

  return {
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
  };
};
