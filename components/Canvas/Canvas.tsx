"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas } from "fabric";
import { GuidelineType } from "./types/canvas.types";
import { CANVAS_DEFAULT_CONFIG } from "./utils/constants";
import { useCanvasInitialization } from "./hooks/useCanvasInitialization";
import Settings from "./Settings/Settings";
import Sidebar from "./Sidebar/Sidebar";
import TopBar from "../TopBar/TopBar";
import React from "react";

interface HeadlineEditorCanvasProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

const HeadlineEditorCanvas: React.FC<HeadlineEditorCanvasProps> = ({
  width = 800,
  height = 600,
  backgroundColor = "#ffffff",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [guidelines, setGuidelines] = useState<GuidelineType[]>([]);

  useCanvasInitialization(
    canvasRef,
    {
      ...CANVAS_DEFAULT_CONFIG,
      width,
      height,
      backgroundColor,
    },
    guidelines,
    setGuidelines,
    setCanvas
  );

  const handleWrapperClick = useCallback(
    (e: MouseEvent) => {
      if (!canvas || !canvasWrapperRef.current) return;
      const target = e.target as HTMLElement;
      if (target === canvasWrapperRef.current) {
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      }
    },
    [canvas]
  );

  useEffect(() => {
    const wrapper = canvasWrapperRef.current;
    if (!wrapper) return;

    wrapper.addEventListener("mousedown", handleWrapperClick);
    return () => {
      wrapper.removeEventListener("mousedown", handleWrapperClick);
    };
  }, [handleWrapperClick]);

  useEffect(() => {
    if (!canvas) return;

    const handleLayerChange = () => {
      canvas.requestRenderAll();
    };

    document.addEventListener("layerChanged", handleLayerChange);
    return () => {
      document.removeEventListener("layerChanged", handleLayerChange);
    };
  }, [canvas]);

  return (
    <div className="min-h-screen flex bg-tertiary">
      <Sidebar canvas={canvas} />
      <div className="flex-grow flex flex-col">
        <TopBar canvas={canvas} />
        <Settings canvas={canvas} />
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

export default HeadlineEditorCanvas;
