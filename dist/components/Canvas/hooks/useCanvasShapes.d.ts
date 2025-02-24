import { fabric } from "fabric";
export declare function useCanvasShapes(canvas: fabric.Canvas | null): {
    handleAddRectangle: () => void;
    handleAddCircle: () => void;
    handleAddText: () => void;
    handleImageUpload: (file: File) => void;
    handleAddIcon: (iconPath: string, color: string) => void;
};
