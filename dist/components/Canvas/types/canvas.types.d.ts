import { Canvas, Object as FabricObject, Line } from "fabric";
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
export interface CanvasContextType {
    canvas: Canvas | null;
    setCanvas: (canvas: Canvas | null) => void;
    guidelines: GuidelineType[];
    setGuidelines: (guidelines: GuidelineType[]) => void;
    config: CanvasConfigType;
}
