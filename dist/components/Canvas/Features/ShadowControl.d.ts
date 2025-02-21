import React from "react";
import type { ShadowState } from "../types/effects.types";
interface ShadowControlProps {
    shadow: ShadowState;
    onChange: (updates: Partial<ShadowState>) => void;
}
export declare const ShadowControl: React.MemoExoticComponent<({ shadow, onChange }: ShadowControlProps) => import("react/jsx-runtime").JSX.Element>;
export {};
