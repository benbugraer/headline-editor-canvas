import React from "react";
import { TextFormatting, TextAlignType } from "../types/canvas.types";
interface TextFormattingControlsProps {
    textFormatting: TextFormatting;
    updateTextFormatting: (property: keyof TextFormatting, value: boolean | TextAlignType) => void;
}
export declare const TextFormattingControls: React.FC<TextFormattingControlsProps>;
export {};
