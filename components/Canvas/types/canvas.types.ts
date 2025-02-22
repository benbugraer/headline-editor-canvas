import { Canvas, Object as FabricObject, Line } from "fabric";
import { PiRectangleBold } from "react-icons/pi";
import { VscCircleLarge } from "react-icons/vsc";
import { PiTextTFill } from "react-icons/pi";
import { FaFontAwesome } from "react-icons/fa";
import { IoImageSharp } from "react-icons/io5";
import { TbLayoutGridFilled } from "react-icons/tb";
import { IconType } from "react-icons";

export interface GuidelineType {
  position: number;
  orientation: "horizontal" | "vertical";
  id?: string;
  line?: Line;
  length?: number;
  isHorizontal: boolean;
}

export interface CanvasConfigType {
  width: number;
  height: number;
  backgroundColor: string;
}

export interface SnappingConfigType {
  snappingDistance: number;
}

export interface CanvasEventHandlers {
  onObjectMoving: (canvas: Canvas, target: FabricObject | undefined) => void;
  onObjectModified: () => void;
}

export interface TextAlignType {
  left: boolean;
  center: boolean;
  right: boolean;
  justify: boolean;
}

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
    icon: IoImageSharp,
  },
  {
    label: "İkon Ekle",
    icon: FaFontAwesome,
  },
  {
    label: "Manşet Seç",
    icon: TbLayoutGridFilled,
  },
] as const;

export interface SidebarItem {
  icon: IconType;
  label: string;
}

export interface CanvasContextType {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
  guidelines: GuidelineType[];
  setGuidelines: (guidelines: GuidelineType[]) => void;
  config: CanvasConfigType;
}
