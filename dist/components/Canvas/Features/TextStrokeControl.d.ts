import React from "react";
import type { TextStrokeState } from "../types/effects.types";
interface TextStrokeControlProps {
    stroke: TextStrokeState;
    onChange: (updates: Partial<TextStrokeState>) => void;
}
export declare const TextStrokeControl: React.MemoExoticComponent<({ stroke, onChange }: TextStrokeControlProps) => React.JSX.Element>;
export {};
