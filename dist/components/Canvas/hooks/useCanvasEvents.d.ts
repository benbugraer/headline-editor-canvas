import { Object as FabricObject, Canvas } from "fabric";
import { GuidelineType } from "../types/canvas.types";
export declare function useCanvasEvents(canvas: Canvas | null, handleObjectSelection: (obj: FabricObject | null) => void, clearSettings: () => void): {
    guidelines: GuidelineType[];
    setGuidelines: import("react").Dispatch<import("react").SetStateAction<GuidelineType[]>>;
};
