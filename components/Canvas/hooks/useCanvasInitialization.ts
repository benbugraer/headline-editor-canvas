import { useEffect, RefObject } from "react";
import { Canvas, Image as FabricImage } from "fabric"; // Image'i de import ediyoruz
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

    const initCanvas = new Canvas(canvasRef.current, config);

    initCanvas.renderAll();
    setCanvas(initCanvas);

    // Event listeners
    initCanvas.on("object:moving", (event) =>
      handleObjectMoving(initCanvas, event.target, guidelines, setGuidelines)
    );

    initCanvas.on("object:modified", () => {
      clearGuidelines(initCanvas, guidelines, setGuidelines);
    });

    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();

      const clipboardItems = event.clipboardData?.items;
      if (!clipboardItems) return;

      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];

        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          if (!blob) continue;

          const img = new Image();
          const blobUrl = URL.createObjectURL(blob);

          img.onload = () => {
            const fabricImage = new FabricImage(img, {
              left: initCanvas.width! / 2,
              top: initCanvas.height! / 2,
              originX: "center",
              originY: "center",
            });

            const scale = Math.min(
              (initCanvas.width! * 0.8) / img.width,
              (initCanvas.height! * 0.8) / img.height,
              1
            );
            fabricImage.scale(scale);

            initCanvas.add(fabricImage);
            initCanvas.setActiveObject(fabricImage);
            initCanvas.renderAll();

            URL.revokeObjectURL(blobUrl);
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

    window.addEventListener("paste", handlePaste);

    return () => {
      initCanvas.dispose();
      window.removeEventListener("paste", handlePaste);
    };
  }, []);
};
