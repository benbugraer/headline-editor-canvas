"use client";

import React, { useState, useEffect, useRef } from "react";
import * as fabric from "fabric"; // v6
import { Button } from "../ui/button";
import Settings from "./CanvasSettings";
import CanvasNavigation from "../Sidebar/CanvasNavigation";

export default function CanvasApp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const addRectangle = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 60,
        fill: "#ff5757",
      });
      canvas.add(rect);
      canvas.renderAll();
    }
  };

  const addCircle = () => {
    if (canvas) {
      const circle = new fabric.Circle({
        top: 150,
        left: 150,
        radius: 50,
        fill: "#d84d42",
      });
      canvas.add(circle);
      canvas.renderAll();
    }
  };

  const addText = () => {
    if (canvas) {
      const text = new fabric.IText("Text", {
        left: 100,
        top: 100,
        fontFamily: "Arial",
        fontSize: 20,
        fill: "#000000",
      });

      text.on("mousedown", (e) => {
        if (e.button !== 2) {
          return;
        }
        text.enterEditing();
        text.selectAll();
        canvas.renderAll();
      });

      canvas.add(text);
      canvas.renderAll();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const fabricImage = new fabric.Image(img);
          fabricImage.scaleToWidth(200); // Resmi 200 piksel genişliğe ölçekle
          canvas.add(fabricImage);
          canvas.renderAll();
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex text-center items-center justify-center flex-col p-4 bg-gray-200 min-h-fit rounded-xl h-full">
      <CanvasNavigation />

      {/* <div className="flex gap-2">
        <Button className="bg-gray-400 text-white mb-4" onClick={addRectangle}>
          Add Rectangle
        </Button>
        <Button className="bg-gray-400 text-white mb-4" onClick={addCircle}>
          Add Circle
        </Button>
        <Button className="bg-gray-400 text-white mb-4" onClick={addText}>
          Add Text
        </Button>
        <label className="bg-gray-400 text-white mb-4 px-4 py-2 rounded cursor-pointer">
          Upload Image
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            accept="image/*"
          />
        </label>
      </div> */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <canvas ref={canvasRef} />
      </div>
      <Settings canvas={canvas} />
    </div>
  );
}
