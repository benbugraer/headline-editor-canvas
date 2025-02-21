import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { HeadlineEditorProps, CanvasState } from "../types";

const HeadlineEditor: React.FC<HeadlineEditorProps> = ({
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
  const [canvasState, setCanvasState] = useState<CanvasState>({
    canvas: null,
    backgroundColor: defaultBackgroundColor,
    objects: [],
  });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
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

  const addText = () => {
    if (canvasState.canvas) {
      const text = new fabric.IText("Yeni Metin", {
        left: 100,
        top: 100,
        fontFamily: defaultFontFamily,
        fontSize: defaultFontSize,
        fill: defaultTextColor,
      });
      canvasState.canvas.add(text);
      canvasState.canvas.setActiveObject(text);
      canvasState.canvas.renderAll();
    }
  };

  const handleSave = () => {
    if (canvasState.canvas && onSave) {
      const dataUrl = canvasState.canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2,
      });
      onSave(dataUrl);
    }
  };

  return (
    <div className="headline-editor">
      <div className="toolbar">
        <button onClick={addText}>Metin Ekle</button>
        <button onClick={handleSave}>Kaydet</button>
        {onClose && <button onClick={onClose}>Kapat</button>}
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default HeadlineEditor;
