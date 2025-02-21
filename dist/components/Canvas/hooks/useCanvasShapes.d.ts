import { Canvas as FabricCanvas } from "fabric";
export declare function useCanvasShapes(canvas: FabricCanvas | null): {
    handleAddRectangle: () => void;
    handleAddCircle: () => void;
    handleAddText: () => void;
    handleImageUpload: (file: File) => void;
    handleAddIcon: (iconPath: string, color: string) => void;
};
