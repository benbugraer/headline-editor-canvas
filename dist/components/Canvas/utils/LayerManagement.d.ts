import { fabric } from "fabric";
export declare const layerManagement: {
    moveObjectUp(canvas: fabric.Canvas, object: fabric.Object): void;
    moveObjectDown(canvas: fabric.Canvas, object: fabric.Object): void;
    moveObjectToTop(canvas: fabric.Canvas, object: fabric.Object): void;
    moveObjectToBottom(canvas: fabric.Canvas, object: fabric.Object): void;
    alignObject(canvas: fabric.Canvas, object: fabric.Object, align: "left" | "center" | "right" | "top" | "middle" | "bottom"): void;
};
