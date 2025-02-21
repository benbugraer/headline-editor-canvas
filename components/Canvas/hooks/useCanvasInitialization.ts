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

    // Canvas initialization with strict configuration
    const initCanvas = new Canvas(canvasRef.current, {
      ...config,
      selection: true,
      preserveObjectStacking: true,
      enableRetinaScaling: true,
      stopContextMenu: true,
      fireRightClick: true,
    });

    // Initial render
    initCanvas.renderAll();
    setCanvas(initCanvas);

    // Event handler functions with proper typing
    function objectMovingHandler(this: Canvas) {
      const activeObject = this.getActiveObject();
      if (!activeObject) return;

      try {
        handleObjectMoving(this, activeObject, guidelines, setGuidelines);
      } catch (error) {
        console.error("Error in object moving handler:", error);
      }
    }

    function objectModifiedHandler(this: Canvas) {
      try {
        clearGuidelines(this, guidelines, setGuidelines);
      } catch (error) {
        console.error("Error in object modified handler:", error);
      }
    }

    const handlePaste = async (event: ClipboardEvent) => {
      event.preventDefault();
      const clipboardItems = event.clipboardData?.items;
      if (!clipboardItems) return;

      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.indexOf("image") !== -1) {
          try {
            const blob = item.getAsFile();
            if (!blob) continue;

            const blobUrl = URL.createObjectURL(blob);

            // Create a promise to handle image loading
            const loadImage = () => {
              return new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error("Failed to load image"));
                img.src = blobUrl;
              });
            };

            try {
              const img = await loadImage();
              const scale = Math.min(
                (initCanvas.width! * 0.8) / img.width,
                (initCanvas.height! * 0.8) / img.height,
                1
              );

              // Create fabric image
              const fabricImage = new FabricImage(img, {
                left: (initCanvas.width! - img.width * scale) / 2,
                top: (initCanvas.height! - img.height * scale) / 2,
                scaleX: scale,
                scaleY: scale,
                cornerStyle: "circle",
                transparentCorners: false,
                cornerSize: 12,
                padding: 0,
                strokeWidth: 0,
                strokeUniform: true,
                centeredRotation: true,
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
            } finally {
              URL.revokeObjectURL(blobUrl);
            }
          } catch (error) {
            console.error("Error handling pasted image:", error);
          }
          break;
        }
      }
    };

    // Add event listeners with error boundaries
    try {
      initCanvas.on("object:moving", objectMovingHandler.bind(initCanvas));
      initCanvas.on("object:modified", objectModifiedHandler.bind(initCanvas));
      window.addEventListener("paste", handlePaste);
    } catch (error) {
      console.error("Error setting up event listeners:", error);
    }

    // Cleanup function
    return () => {
      try {
        // Remove event listeners
        initCanvas.off("object:moving", objectMovingHandler.bind(initCanvas));
        initCanvas.off(
          "object:modified",
          objectModifiedHandler.bind(initCanvas)
        );
        window.removeEventListener("paste", handlePaste);

        // Clear all objects
        initCanvas.getObjects().forEach((obj) => {
          try {
            initCanvas.remove(obj);
          } catch (error) {
            console.error("Error removing object:", error);
          }
        });

        // Dispose canvas
        initCanvas.dispose();

        // Clear canvas reference
        setCanvas(null);
      } catch (error) {
        console.error("Error in cleanup:", error);
      }
    };
  }, []); // Empty dependency array since we only want to initialize once
};
