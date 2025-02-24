import { fabric } from "fabric";

export const layerManagement = {
  moveObjectUp(canvas: fabric.Canvas, object: fabric.Object) {
    if (!canvas || !object || typeof window === "undefined") return;
    try {
      canvas.bringForward(object);
      canvas.renderAll();
    } catch (error) {
      console.error("Error moving object up:", error);
    }
  },

  moveObjectDown(canvas: fabric.Canvas, object: fabric.Object) {
    if (!canvas || !object || typeof window === "undefined") return;
    try {
      canvas.sendBackwards(object);
      canvas.renderAll();
    } catch (error) {
      console.error("Error moving object down:", error);
    }
  },

  moveObjectToTop(canvas: fabric.Canvas, object: fabric.Object) {
    if (!canvas || !object || typeof window === "undefined") return;
    try {
      canvas.bringToFront(object);
      canvas.renderAll();
    } catch (error) {
      console.error("Error moving object to top:", error);
    }
  },

  moveObjectToBottom(canvas: fabric.Canvas, object: fabric.Object) {
    if (!canvas || !object || typeof window === "undefined") return;
    try {
      canvas.sendToBack(object);
      canvas.renderAll();
    } catch (error) {
      console.error("Error moving object to bottom:", error);
    }
  },

  alignObject(
    canvas: fabric.Canvas,
    object: fabric.Object,
    align: "left" | "center" | "right" | "top" | "middle" | "bottom"
  ) {
    if (!canvas || !object || typeof window === "undefined") return;
    try {
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();
      const objectWidth = object.getScaledWidth();
      const objectHeight = object.getScaledHeight();

      switch (align) {
        case "left":
          object.set({ left: 0 });
          break;
        case "center":
          object.set({ left: (canvasWidth - objectWidth) / 2 });
          break;
        case "right":
          object.set({ left: canvasWidth - objectWidth });
          break;
        case "top":
          object.set({ top: 0 });
          break;
        case "middle":
          object.set({ top: (canvasHeight - objectHeight) / 2 });
          break;
        case "bottom":
          object.set({ top: canvasHeight - objectHeight });
          break;
      }

      object.setCoords();
      canvas.renderAll();
    } catch (error) {
      console.error("Error aligning object:", error);
    }
  },
};
