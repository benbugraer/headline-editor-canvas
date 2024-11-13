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

  useCanvasInitialization(
    canvasRef,
    CANVAS_DEFAULT_CONFIG,
    guidelines,
    setGuidelines,
    setCanvas
  );

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[10.938rem_1fr]">
      <Sidebar canvas={canvas} />
      <TopBar canvas={canvas}>
        <Settings canvas={canvas} />
        <div className="flex-grow flex flex-col justify-center items-center overflow-auto p-4">
          <canvas ref={canvasRef} className="border border-tertiary" />
        </div>
      </TopBar>
    </div>
  );
}
