"use client";

import React, { useState, useEffect, useRef } from "react";
import * as fabric from "fabric";
import Settings from "./Settings";
import Sidebar from "../Sidebar/Sidebar";
import TopBar from "../TopBar/TopBar";
import { handleObjectMoving, clearGuidelines } from "./SnappingHelpers";

export default function CanvasApp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: 700,
        height: 700,
        backgroundColor: "#fff",
      });

      initCanvas.renderAll();
      setCanvas(initCanvas);

      initCanvas.on("object:moving", (event) =>
        handleObjectMoving(initCanvas, event.target, guidelines, setGuidelines)
      );
      initCanvas.on("object:modified", () => {
        clearGuidelines(initCanvas, guidelines, setGuidelines);
      });

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[10.938rem_1fr]">
      <Sidebar canvas={canvas} />
      <div className="flex flex-col h-screen">
        <TopBar>
          <div className="flex-grow flex flex-col">
            <Settings canvas={canvas} />
            <div className="flex-grow flex flex-col justify-center items-center overflow-auto p-4 mt-28">
              <canvas ref={canvasRef} className="border border-tertiary" />
            </div>
          </div>
        </TopBar>
      </div>
    </div>
  );
}
