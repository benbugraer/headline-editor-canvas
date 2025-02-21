import {
  LuChevronDown,
  LuChevronsDown,
  LuChevronUp,
  LuChevronsUp,
} from "react-icons/lu";

import {
  CiAlignLeft,
  CiAlignRight,
  CiAlignTop,
  CiAlignBottom,
  CiAlignCenterH,
  CiAlignCenterV,
} from "react-icons/ci";

export const HEADLINE_SIZES = {
  square: {
    label: "Kare Manşet",
    width: 547,
    height: 574,
  },
  wide: {
    label: "Geniş Manşet",
    width: 979,
    height: 550,
  },
  default: {
    label: "Varsayılan(20'lik Manşet)",
    width: 868,
    height: 488,
  },
} as const;

export const CANVAS_DEFAULT_CONFIG = {
  width: HEADLINE_SIZES.default.width,
  height: HEADLINE_SIZES.default.height,
  backgroundColor: "#fff",
} as const;

export const SNAPPING_CONFIG = {
  snappingDistance: 10,
} as const;

export const GUIDELINE_STYLES = {
  stroke: "blue",
  strokeWidth: 1,
  selectable: false,
  evented: false,
  strokeDashArray: [5, 5] as number[],
  opacity: 0.8,
} as const;

export const LAYER_ACTIONS = [
  { action: "up" as const, icon: LuChevronUp, label: "Up" },
  { action: "down" as const, icon: LuChevronDown, label: "Down" },
  { action: "top" as const, icon: LuChevronsUp, label: "To forward" },
  { action: "bottom" as const, icon: LuChevronsDown, label: "To bottom" },
] as const;

export const ALIGN_ACTIONS = [
  { align: "left" as const, icon: CiAlignLeft },
  { align: "center" as const, icon: CiAlignCenterH },
  { align: "right" as const, icon: CiAlignRight },
  { align: "top" as const, icon: CiAlignTop },
  { align: "middle" as const, icon: CiAlignCenterV },
  { align: "bottom" as const, icon: CiAlignBottom },
] as const;
