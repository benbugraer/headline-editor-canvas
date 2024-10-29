import { Canvas, Object as FabricObject, Line } from "fabric";

export type GuidelineType = {
  id: string; // GuidelineId enum değerlerinden biri
  line: Line;
};

export type CanvasConfigType = {
  width: number;
  height: number;
  backgroundColor: string;
};

export type SnappingConfigType = {
  snappingDistance: number;
};

export type CanvasEventHandlers = {
  onObjectMoving: (canvas: Canvas, target: FabricObject | undefined) => void;
  onObjectModified: () => void;
};

export type TextAlignType = "left" | "center" | "right" | "justify";

export interface TextFormatting {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  textAlign: TextAlignType;
}
