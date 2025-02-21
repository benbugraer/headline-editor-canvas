import * as fabric from "fabric";
import { TextFormatting, TextAlignType } from "../types/canvas.types";
export declare const useTextFormatting: (canvas: fabric.Canvas | null, selectedObject: fabric.Object | null) => {
    textFormatting: TextFormatting;
    updateTextFormatting: (property: keyof TextFormatting, value: boolean | TextAlignType) => void;
};
