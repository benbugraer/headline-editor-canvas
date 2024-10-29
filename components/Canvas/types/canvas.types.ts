import { Canvas, Object as FabricObject, Line } from "fabric";
import { RxText } from "react-icons/rx";
import { MdOutlineRectangle, MdOutlineCircle } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";

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

export const TOOLBAR_ITEMS = [
  {
    label: "Rectangle",
    icon: MdOutlineRectangle,
  },
  {
    label: "Circle",
    icon: MdOutlineCircle,
  },
  {
    label: "Text",
    icon: RxText,
  },
  {
    label: "Add Image",
    icon: RiImageAddFill,
  },
] as const;
