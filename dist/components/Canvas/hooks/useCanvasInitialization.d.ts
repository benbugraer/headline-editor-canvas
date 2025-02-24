import { RefObject } from "react";
import { fabric } from "fabric";
import { CanvasConfigType, GuidelineType } from "../types/canvas.types";
export declare const useCanvasInitialization: (canvasRef: RefObject<HTMLCanvasElement>, config: CanvasConfigType, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void, setCanvas: (canvas: fabric.Canvas | null) => void) => void;
