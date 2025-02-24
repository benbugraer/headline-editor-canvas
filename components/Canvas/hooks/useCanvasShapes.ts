/* eslint-disable @typescript-eslint/no-unused-vars */
import { fabric } from "fabric";
import { useCallback } from "react";

const DEFAULT_OBJECT_CONFIG = {
  cornerColor: "#2196F3",
  cornerStrokeColor: "#2196F3",
  borderColor: "#2196F3",
  cornerSize: 8,
  transparentCorners: false,
  cornerStyle: "circle",
  padding: 8,
} as const;

export function useCanvasShapes(canvas: fabric.Canvas | null) {
  const centerObject = useCallback(
    (object: fabric.Object) => {
      if (!canvas) return;
      const canvasCenter = {
        x: canvas.width! / 2,
        y: canvas.height! / 2,
      };
      object.set({
        left: canvasCenter.x - (object.width! * (object.scaleX || 1)) / 2,
        top: canvasCenter.y - (object.height! * (object.scaleY || 1)) / 2,
        ...DEFAULT_OBJECT_CONFIG,
      });
    },
    [canvas]
  );

  const handleAddRectangle = useCallback(() => {
    if (!canvas || typeof window === "undefined") return;
    try {
      const rect = new fabric.Rect({
        width: 100,
        height: 60,
        fill: "#ff5757",
        ...DEFAULT_OBJECT_CONFIG,
      });
      centerObject(rect);
      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
    } catch (error) {
      console.error("Error adding rectangle:", error);
    }
  }, [canvas, centerObject]);

  const handleAddCircle = useCallback(() => {
    if (!canvas || typeof window === "undefined") return;
    try {
      const circle = new fabric.Circle({
        radius: 50,
        fill: "#ff5757",
        ...DEFAULT_OBJECT_CONFIG,
      });
      centerObject(circle);
      canvas.add(circle);
      canvas.setActiveObject(circle);
      canvas.renderAll();
    } catch (error) {
      console.error("Error adding circle:", error);
    }
  }, [canvas, centerObject]);

  const handleAddText = useCallback(() => {
    if (!canvas || typeof window === "undefined") return;
    try {
      const text = new fabric.IText("Yeni Metin", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "#000000",
        ...DEFAULT_OBJECT_CONFIG,
      });

      centerObject(text);

      // Right click to edit text
      text.on("mousedown", (e: fabric.IEvent) => {
        if ((e.e as MouseEvent).button !== 2) return;
        text.enterEditing();
        text.selectAll();
        canvas.renderAll();
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    } catch (error) {
      console.error("Error adding text:", error);
    }
  }, [canvas, centerObject]);

  const handleImageUpload = useCallback(
    (file: File) => {
      if (!canvas || typeof window === "undefined") return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            fabric.Image.fromURL(e.target?.result as string, (fabricImage) => {
              if (!fabricImage) return;

              // Scale image to fit canvas while maintaining aspect ratio
              const scale = Math.min(
                (canvas.width! * 0.8) / fabricImage.width!,
                (canvas.height! * 0.8) / fabricImage.height!,
                1
              );
              fabricImage.scale(scale);
              fabricImage.set(DEFAULT_OBJECT_CONFIG);

              centerObject(fabricImage);
              canvas.add(fabricImage);
              canvas.setActiveObject(fabricImage);
              canvas.renderAll();
            });
          } catch (error) {
            console.error("Error creating fabric image:", error);
          }
        };
        img.onerror = () => {
          console.error("Error loading image");
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        console.error("Error reading file");
      };
      reader.readAsDataURL(file);
    },
    [canvas, centerObject]
  );

  const handleAddIcon = useCallback(
    (iconPath: string, color: string) => {
      if (!canvas || typeof window === "undefined") return;
      try {
        fabric.loadSVGFromString(iconPath, (objects, options) => {
          const path = fabric.util.groupSVGElements(objects, options);
          path.set({
            fill: color,
            scaleX: 0.05,
            scaleY: 0.05,
            ...DEFAULT_OBJECT_CONFIG,
          });

          centerObject(path);
          canvas.add(path);
          canvas.setActiveObject(path);
          canvas.renderAll();
        });
      } catch (error) {
        console.error("Error adding icon:", error);
      }
    },
    [canvas, centerObject]
  );

  return {
    handleAddRectangle,
    handleAddCircle,
    handleAddText,
    handleImageUpload,
    handleAddIcon,
  };
}
