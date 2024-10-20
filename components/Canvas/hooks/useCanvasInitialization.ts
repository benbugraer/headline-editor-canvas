import { useEffect, RefObject } from "react";
import { Canvas } from "fabric";
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

    return () => {
      initCanvas.dispose();
    };
  }, []);
};
