import { Canvas, Object as FabricObject, Line } from "fabric";
import {
  BiRectangle,
  BiCircle,
  BiText,
  BiImageAdd,
  BiPlus,
} from "react-icons/bi";
import { MdOutlineLibraryAdd } from "react-icons/md";

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
    icon: BiRectangle,
  },
  {
    label: "Circle",
    icon: BiCircle,
  },
  {
    label: "Text",
    icon: BiText,
  },
  {
    label: "Add Image",
    icon: BiImageAdd,
  },
  {
    label: "Add Icon",
    icon: MdOutlineLibraryAdd,
  },
] as const;
