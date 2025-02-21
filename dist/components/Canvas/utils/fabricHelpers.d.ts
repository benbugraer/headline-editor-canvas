import * as fabric from "fabric";
import { EffectState, ShadowState, TextStrokeState, CornerRadiusState, BackgroundState } from "../types/effects.types";
type DefaultStates = {
    opacity: EffectState;
    shadow: ShadowState;
    textStroke: TextStrokeState;
    shapeRadius: CornerRadiusState;
    background: BackgroundState;
};
export declare const getInitialStates: (object: fabric.Object | null) => DefaultStates;
export declare const createShadow: (shadowState: ShadowState) => fabric.Shadow;
export {};
