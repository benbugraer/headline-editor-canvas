"use client";

import React, { useState, useEffect, useRef } from "react";
import * as fabric from "fabric";
import CanvasNavigation from "../Sidebar/CanvasNavigation";
import Settings from "./CanvasSettings";

export default function CanvasApp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 700,
        height: 700,
        backgroundColor: "#fff",
      });

      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  return (
    <div className="flex text-center items-center justify-center flex-col  bg-secondary min-h-fit rounded-xl h-full">
      <CanvasNavigation canvas={canvas} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <canvas ref={canvasRef} />
      </div>

      <Settings canvas={canvas} />
    </div>
  );
}
