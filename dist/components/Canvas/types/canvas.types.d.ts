import { Canvas, Object as FabricObject, Line } from "fabric";
import { IconType } from "react-icons";
export type GuidelineType = {
    length: number;
    position: number;
    isHorizontal: boolean;
    id: string;
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
export declare const SIDEBAR_ITEMS: readonly [{
    readonly label: "Dikdörtgen";
    readonly icon: IconType;
    readonly action: "rectangle";
}, {
    readonly label: "Daire";
    readonly icon: IconType;
    readonly action: "circle";
}, {
    readonly label: "Metin";
    readonly icon: IconType;
}, {
    readonly label: "Görsel Ekle";
    readonly icon: IconType;
}, {
    readonly label: "İkon Ekle";
    readonly icon: IconType;
}, {
    readonly label: "Manşet Seç";
    readonly icon: IconType;
}];
export interface SidebarItem {
    icon: IconType;
    label: string;
}
