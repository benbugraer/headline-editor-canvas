import { useEffect, RefObject } from "react";
import { fabric } from "fabric";
import { CanvasConfigType, GuidelineType } from "../types/canvas.types";
import { handleObjectMoving, clearGuidelines } from "../utils/snapping";

export const useCanvasInitialization = (
  canvasRef: RefObject<HTMLCanvasElement>,
  config: CanvasConfigType,
  guidelines: GuidelineType[],
  setGuidelines: (guidelines: GuidelineType[]) => void,
  setCanvas: (canvas: fabric.Canvas | null) => void
) => {
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR check
    if (!canvasRef.current) return;

    const initCanvas = new fabric.Canvas(canvasRef.current, config);

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
            const scale = Math.min(
              (initCanvas.width! * 0.8) / img.width,
              (initCanvas.height! * 0.8) / img.height,
              1
            );

            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;

            new fabric.Image(
              img,
              {
                left: (initCanvas.width! - scaledWidth) / 2,
                top: (initCanvas.height! - scaledHeight) / 2,
                originX: "left",
                originY: "top",
                scaleX: scale,
                scaleY: scale,
                hasControls: true,
                hasBorders: true,
                selectable: true,
                cornerStyle: "circle",
                transparentCorners: false,
                cornerSize: 12,
                padding: 0,
                strokeWidth: 0,
                strokeUniform: true,
                centeredRotation: true,
              },
              (fabricImage) => {
                if (!fabricImage) return;

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
              }
            );

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
