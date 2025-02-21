import React from "react";
interface LayerControlsProps {
    onLayerChange: (action: "up" | "down" | "top" | "bottom") => void;
    onAlignChange: (align: "left" | "center" | "right" | "top" | "middle" | "bottom") => void;
}
export declare function LayerControls({ onLayerChange, onAlignChange, }: LayerControlsProps): React.JSX.Element;
export {};
