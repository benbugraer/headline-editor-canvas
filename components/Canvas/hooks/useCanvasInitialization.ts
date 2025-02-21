import { useEffect, RefObject } from "react";
import { Canvas, Image as FabricImage } from "fabric";
import { CanvasConfigType, GuidelineType } from "../types/canvas.types";
import { handleObjectMoving, clearGuidelines } from "../utils/snapping";

export const useCanvasInitialization = (
  canvasRef: RefObject<HTMLCanvasElement>,
  config: CanvasConfigType,
  guidelines: GuidelineType[],
  setGuidelines: (guidelines: GuidelineType[]) => void,
  setCanvas: (canvas: Canvas | null) => void
) => {
  useEffect(() => {
    if (!canvasRef.current) return;

    // Canvas initialization
    const initCanvas = new Canvas(canvasRef.current, {
      ...config,
      selection: true,
      preserveObjectStacking: true,
    });

    // Initial render
    initCanvas.renderAll();
    setCanvas(initCanvas);

    // Event handler functions
    const objectMovingHandler = (event: any) => {
      if (event.target) {
        handleObjectMoving(initCanvas, event.target, guidelines, setGuidelines);
      }
    };

    const objectModifiedHandler = () => {
      clearGuidelines(initCanvas, guidelines, setGuidelines);
    };

    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();
      const clipboardItems = event.clipboardData?.items;
      if (!clipboardItems) return;

      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          if (!blob) continue;

          const blobUrl = URL.createObjectURL(blob);
          const img = new Image();

          img.onload = () => {
            const scale = Math.min(
              (initCanvas.width! * 0.8) / img.width,
              (initCanvas.height! * 0.8) / img.height,
              1
            );

            FabricImage.fromURL(blobUrl, (fabricImage) => {
              fabricImage.set({
                left: (initCanvas.width! - img.width * scale) / 2,
                top: (initCanvas.height! - img.height * scale) / 2,
                scaleX: scale,
                scaleY: scale,
              });

              fabricImage.setControlsVisibility({
                mt: true,
                mb: true,
                ml: true,
                mr: true,
                bl: true,
                br: true,
                tl: true,
                tr: true,
                mtr: true,
              });

              initCanvas.add(fabricImage);
              initCanvas.setActiveObject(fabricImage);
              fabricImage.setCoords();
              initCanvas.requestRenderAll();
              URL.revokeObjectURL(blobUrl);
            });
          };

          img.onerror = () => {
            console.error("Error loading image");
            URL.revokeObjectURL(blobUrl);
          };

          img.src = blobUrl;
          break;
        }
      }
    };

    // Add event listeners
    initCanvas.on("object:moving", objectMovingHandler);
    initCanvas.on("object:modified", objectModifiedHandler);
    window.addEventListener("paste", handlePaste);

    // Cleanup function
    return () => {
      // Remove event listeners
      initCanvas.off("object:moving", objectMovingHandler);
      initCanvas.off("object:modified", objectModifiedHandler);
      window.removeEventListener("paste", handlePaste);

      // Clear all objects and dispose canvas
      initCanvas.getObjects().forEach((obj) => initCanvas.remove(obj));
      initCanvas.dispose();

      // Clear canvas reference
      setCanvas(null);
    };
  }, []); // Empty dependency array since we only want to initialize once
};
