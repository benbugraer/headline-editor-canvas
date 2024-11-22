import { Canvas, Object as FabricObject, Line } from "fabric";
import { PiRectangleBold } from "react-icons/pi";
import { VscCircleLarge } from "react-icons/vsc";
import { PiTextTFill } from "react-icons/pi";
import { BsFillImageFill } from "react-icons/bs";
import { FaFontAwesome } from "react-icons/fa";

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

export const SIDEBAR_ITEMS = [
  {
    label: "Dikdörtgen",
    icon: PiRectangleBold,
    action: "rectangle",
  },
  {
    label: "Daire",
    icon: VscCircleLarge,
    action: "circle",
  },
  {
    label: "Metin",
    icon: PiTextTFill,
  },
  {
    label: "Görsel Ekle",
    icon: BsFillImageFill,
  },
  {
    label: "İkon Ekle",
    icon: FaFontAwesome,
  },
] as const;
