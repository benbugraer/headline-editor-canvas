"use client";

import React, { useRef, useState } from "react";
import { Canvas } from "fabric";
import { GuidelineType } from "./types/canvas.types";
import { CANVAS_DEFAULT_CONFIG } from "./utils/constants";
import { useCanvasInitialization } from "./hooks/useCanvasInitialization";
import Settings from "./Settings/Settings";
import Sidebar from "./Sidebar/Sidebar";
import TopBar from "../TopBar/TopBar";

export default function CanvasApp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [guidelines, setGuidelines] = useState<GuidelineType[]>([]);
  const [canvasWidth] = useState<number>(868); // Default width
  const [canvasHeight] = useState<number>(488); // Default height

  useCanvasInitialization(
    canvasRef,
    { ...CANVAS_DEFAULT_CONFIG, width: canvasWidth, height: canvasHeight },
    guidelines,
    setGuidelines,
    setCanvas
  );

  return (
    <div className="min-h-screen flex">
      <Sidebar canvas={canvas} />
      <div className="flex-grow flex flex-col">
        <TopBar canvas={canvas} />
        <Settings canvas={canvas} />
        <div className="flex-grow flex justify-center items-center overflow-auto p-4">
          <canvas
            ref={canvasRef}
            className="border border-tertiary"
            width={canvasWidth}
            height={canvasHeight}
          />
        </div>
      </div>
    </div>
  );
}
