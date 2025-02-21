import React from "react";
import { Canvas } from "fabric";
interface HeadlineSelectorProps {
    canvas: Canvas | null;
    onSelect: () => void;
}
export declare function HeadlineSelector({ canvas, onSelect }: HeadlineSelectorProps): React.JSX.Element;
export {};
