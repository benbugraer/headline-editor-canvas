/* eslint-disable @typescript-eslint/no-unused-vars */
import { Canvas as FabricCanvas } from "fabric";
import * as fabric from "fabric";
import { useCallback } from "react";

export function useCanvasShapes(canvas: FabricCanvas | null) {
  const handleAddRectangle = () => {
    if (!canvas) return;
    const rect = new fabric.Rect({
      top: 100,
      left: 50,
      width: 100,
      height: 60,
      fill: "#ff5757",
    });
    canvas.add(rect);
    canvas.renderAll();
  };

  const handleAddCircle = () => {
    if (!canvas) return;
    const circle = new fabric.Circle({
      top: 150,
      left: 150,
      radius: 50,
      fill: "#ff5757",
    });
    canvas.add(circle);
    canvas.renderAll();
  };

  const handleAddText = () => {
    if (!canvas) return;
    const text = new fabric.IText("Yeni Metin", {
      left: 100,
      top: 100,
      fontFamily: "Arial",
      fontSize: 20,
      fill: "#000000",
    });
    text.on("mousedown", (e: fabric.TPointerEventInfo<PointerEvent>) => {
      if (e.e.button !== 2) return;
      text.enterEditing();
      text.selectAll();
      canvas.renderAll();
    });

    canvas.add(text);
    canvas.renderAll();
  };

  const handleImageUpload = (file: File) => {
    if (!canvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const fabricImage = new fabric.Image(img);
        fabricImage.scaleToWidth(200);
        canvas.add(fabricImage);
        canvas.renderAll();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAddIcon = useCallback(
    (iconPath: string, color: string) => {
      if (!canvas) return;

      const path = new fabric.Path(iconPath, {
        left: 200,
        top: 200,
        fill: color,
        scaleX: 0.05,
        scaleY: 0.05,
      });

      canvas.add(path);
      canvas.setActiveObject(path);
      canvas.renderAll();
    },
    [canvas]
  );

  return {
    handleAddRectangle,
    handleAddCircle,
    handleAddText,
    handleImageUpload,
    handleAddIcon,
  };
}
