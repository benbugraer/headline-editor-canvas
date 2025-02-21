import React from "react";
import type { CornerRadiusState } from "../types/effects.types";
interface ShapeRadiusControlProps {
    radius: CornerRadiusState;
    onChange: (updates: Partial<CornerRadiusState>) => void;
    isCircle: boolean;
}
export declare const ShapeRadiusControl: React.MemoExoticComponent<({ radius, onChange, isCircle }: ShapeRadiusControlProps) => React.JSX.Element>;
export {};
