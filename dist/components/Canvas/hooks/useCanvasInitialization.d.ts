import { RefObject } from "react";
import { Canvas } from "fabric";
import { CanvasConfigType, GuidelineType } from "../types/canvas.types";
export declare const useCanvasInitialization: (canvasRef: RefObject<HTMLCanvasElement>, config: CanvasConfigType, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void, setCanvas: (canvas: Canvas | null) => void) => void;
