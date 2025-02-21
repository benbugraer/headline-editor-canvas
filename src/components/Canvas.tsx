import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "fabric";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Settings } from "./Settings";
import { CanvasState } from "../types";

export const HeadlineEditor: React.FC<HeadlineEditorProps> = ({
  initialWidth = 1200,
  initialHeight = 630,
  onSave,
  onClose,
  defaultBackgroundColor = "#ffffff",
  defaultFontFamily = "Arial",
  defaultFontSize = 48,
  defaultTextColor = "#000000",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    canvas: null,
    backgroundColor: defaultBackgroundColor,
    objects: [],
  });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new Canvas(canvasRef.current, {
        width: initialWidth,
        height: initialHeight,
        backgroundColor: defaultBackgroundColor,
      });

      setCanvasState((prev) => ({ ...prev, canvas }));

      return () => {
        canvas.dispose();
      };
    }
  }, [initialWidth, initialHeight, defaultBackgroundColor]);

  useEffect(() => {
    if (!canvasState.canvas || !canvasWrapperRef.current) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target === canvasWrapperRef.current) {
        canvasState.canvas.discardActiveObject();
        canvasState.canvas.requestRenderAll();
      }
    };

    canvasWrapperRef.current.addEventListener("mousedown", handleClick);
    return () => {
      canvasWrapperRef.current?.removeEventListener("mousedown", handleClick);
    };
  }, [canvasState.canvas]);

  return (
    <div className="min-h-screen flex bg-tertiary">
      <Sidebar canvas={canvasState.canvas} />
      <div className="flex-grow flex flex-col">
        <TopBar canvas={canvasState.canvas} onSave={onSave} onClose={onClose} />
        <Settings canvas={canvasState.canvas} />
        <div
          ref={canvasWrapperRef}
          className="flex-grow flex justify-center items-center overflow-auto p-4 bg-gray-200"
        >
          <canvas ref={canvasRef} className="border-2 border-primary" />
        </div>
      </div>
    </div>
  );
};
