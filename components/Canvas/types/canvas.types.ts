import { Canvas, Object as FabricObject, Line } from "fabric";
import { BiRectangle, BiCircle, BiText, BiImageAdd } from "react-icons/bi";
import { MdOutlineLibraryAdd } from "react-icons/md";

export type GuidelineType = {
  length: number;
  position: number;
  isHorizontal: boolean;
  id: string; // GuidelineId enum değerlerinden biri
  line?: Line;
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
    label: "Dikdörtgen",
    icon: BiRectangle,
  },
  {
    label: "Daire",
    icon: BiCircle,
  },
  {
    label: "Metin",
    icon: BiText,
  },
  {
    label: "Görsel Ekle",
    icon: BiImageAdd,
  },
  {
    label: "İkon Ekle",
    icon: MdOutlineLibraryAdd,
  },
] as const;
