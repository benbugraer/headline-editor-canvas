import React from "react";
interface TextSpacingControlsProps {
    lineHeight: number;
    letterSpacing: number;
    onLineHeightChange: (value: number) => void;
    onLetterSpacingChange: (value: number) => void;
}
export declare function TextSpacingControls({ lineHeight, letterSpacing, onLineHeightChange, onLetterSpacingChange, }: TextSpacingControlsProps): React.JSX.Element;
export {};
