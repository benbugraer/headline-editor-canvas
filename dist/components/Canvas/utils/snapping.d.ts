import { Canvas, FabricObject } from "fabric";
import { GuidelineType } from "../types/canvas.types";
export declare const clearGuidelines: (canvas: Canvas, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void) => void;
export declare const handleObjectMoving: (canvas: Canvas, movingObject: FabricObject, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void) => void;
export declare const setupCanvasEvents: (canvas: Canvas, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void) => () => void;
