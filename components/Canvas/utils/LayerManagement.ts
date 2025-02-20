import * as fabric from "fabric";

export const layerManagement = {
  moveObjectUp(canvas: fabric.Canvas, object: fabric.Object) {
    if (!canvas || !object) return;

    canvas.bringObjectForward(object);
  },

  moveObjectDown(canvas: fabric.Canvas, object: fabric.Object) {
    if (!canvas || !object) return;

    canvas.sendObjectBackwards(object);
  },

  moveObjectToTop(canvas: fabric.Canvas, object: fabric.Object) {
    if (!canvas || !object) return;

    canvas.bringObjectToFront(object);
  },

  moveObjectToBottom(canvas: fabric.Canvas, object: fabric.Object) {
    if (!canvas || !object) return;

    canvas.sendObjectToBack(object);
  },

  alignObject(
    canvas: fabric.Canvas,
    object: fabric.Object,
    align: "left" | "center" | "right" | "top" | "middle" | "bottom"
  ) {
    if (!canvas || !object) return;

    const canvasWidth = canvas.width || 0;
    const canvasHeight = canvas.height || 0;

    switch (align) {
      case "left":
        object.set({ left: 0 });
        break;
      case "center":
        object.set({ left: (canvasWidth - object.width!) / 2 });
        break;
      case "right":
        object.set({ left: canvasWidth - object.width! });
        break;
      case "top":
        object.set({ top: 0 });
        break;
      case "middle":
        object.set({ top: (canvasHeight - object.height!) / 2 });
        break;
      case "bottom":
        object.set({ top: canvasHeight - object.height! });
        break;
    }

    object.setCoords(); // Update object coordinates
    canvas.renderAll();
  },
};
