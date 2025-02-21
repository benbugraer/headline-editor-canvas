import React, { useRef, useState, useEffect } from 'react';
import * as fabric from 'fabric';

// src/components/HeadlineEditor.tsx
var HeadlineEditor = ({
  initialWidth = 1200,
  initialHeight = 630,
  onSave,
  onClose,
  defaultBackgroundColor = "#ffffff",
  defaultFontFamily = "Arial",
  defaultFontSize = 48,
  defaultTextColor = "#000000"
}) => {
  const canvasRef = useRef(null);
  const [canvasState, setCanvasState] = useState({
    canvas: null,
    backgroundColor: defaultBackgroundColor,
    objects: []
  });
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: initialWidth,
        height: initialHeight,
        backgroundColor: defaultBackgroundColor
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
        fill: defaultTextColor
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
        multiplier: 2
      });
      onSave(dataUrl);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "headline-editor" }, /* @__PURE__ */ React.createElement("div", { className: "toolbar" }, /* @__PURE__ */ React.createElement("button", { onClick: addText }, "Metin Ekle"), /* @__PURE__ */ React.createElement("button", { onClick: handleSave }, "Kaydet"), onClose && /* @__PURE__ */ React.createElement("button", { onClick: onClose }, "Kapat")), /* @__PURE__ */ React.createElement("canvas", { ref: canvasRef }));
};

export { HeadlineEditor };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map