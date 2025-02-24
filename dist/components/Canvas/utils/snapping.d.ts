import { fabric } from "fabric";
import { GuidelineType } from "../types/canvas.types";
export declare const clearGuidelines: (canvas: fabric.Canvas, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void) => void;
export declare const handleObjectMoving: (canvas: fabric.Canvas, movingObject: fabric.Object, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void) => void;
export declare const setupCanvasEvents: (canvas: fabric.Canvas, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void) => () => void;
