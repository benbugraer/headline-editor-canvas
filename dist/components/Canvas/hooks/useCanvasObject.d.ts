import * as fabric from "fabric";
import { EffectState, ShadowState, TextStrokeState, BackgroundState, CornerRadiusState } from "../types/effects.types";
export declare const useCanvasObject: (selectedObject: fabric.Object | null, canvas: fabric.Canvas | null, onObjectUpdate?: () => void) => {
    opacity: EffectState;
    shadow: ShadowState;
    textStroke: TextStrokeState;
    shapeRadius: CornerRadiusState;
    background: BackgroundState;
    handlers: {
        handleOpacityChange: (value: number) => void;
        handleOpacityToggle: (enabled: boolean) => void;
        handleShadowChange: (updates: Partial<ShadowState>) => void;
        handleTextStrokeChange: (updates: Partial<TextStrokeState>) => void;
        handleCornerRadiusChange: (updates: Partial<CornerRadiusState>) => void;
        handleBackgroundChange: (updates: Partial<BackgroundState>) => void;
    };
};
