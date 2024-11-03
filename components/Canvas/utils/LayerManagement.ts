import { Canvas, Object as FabricObject } from "fabric/fabric-impl";

export const layerManagement = {
  alignObject: (
    canvas: Canvas,
    object: FabricObject,
    position: "left" | "center" | "right" | "top" | "middle" | "bottom"
  ) => {
    if (!object) return;

    const objBounds = object.getBoundingRect();
    const canvasCenter = canvas.getCenter();

    switch (position) {
      case "left":
        object.set({ left: 0 });
        break;
      case "center":
        object.set({ left: canvasCenter.left - objBounds.width / 2 });
        break;
      case "right":
        object.set({ left: canvas.width! - objBounds.width });
        break;
      case "top":
        object.set({ top: 0 });
        break;
      case "middle":
        object.set({ top: canvasCenter.top - objBounds.height / 2 });
        break;
      case "bottom":
        object.set({ top: canvas.height! - objBounds.height });
        break;
    }

    object.setCoords();
    canvas.renderAll();
  },
};
