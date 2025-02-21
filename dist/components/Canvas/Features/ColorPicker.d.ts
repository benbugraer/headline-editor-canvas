import React from "react";
import { ColorResult } from "react-color";
interface ColorPickerProps {
    color: string;
    onChange: (color: ColorResult) => void;
}
export declare const ColorPicker: React.FC<ColorPickerProps>;
export {};
