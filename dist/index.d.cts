import * as react from 'react';
import react__default, { RefObject } from 'react';
import * as fabric from 'fabric';
import { Line, Canvas, Object as Object$1, FabricObject } from 'fabric';
import { ColorResult } from 'react-color';
import * as react_icons from 'react-icons';
import { IconType } from 'react-icons';

interface HeadlineEditorCanvasProps {
    width?: number;
    height?: number;
    backgroundColor?: string;
}
declare const HeadlineEditorCanvas: react__default.FC<HeadlineEditorCanvasProps>;

interface EffectsProps {
    selectedObject: fabric.Object | null;
    canvas: fabric.Canvas | null;
    onObjectUpdate?: () => void;
}
interface EffectState {
    enabled: boolean;
    value: number;
}
interface ShadowState {
    enabled: boolean;
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
}
interface BackgroundState {
    enabled: boolean;
    color: string;
    padding: number;
}
interface TextStrokeState {
    enabled: boolean;
    width: number;
    color: string;
}
interface CornerRadiusState {
    enabled: boolean;
    radius: number;
    cornerStyle?: "rx" | "percentage";
}
interface ControlProps {
    onChange: (value: number) => void;
    onToggle: (enabled: boolean) => void;
    enabled: boolean;
    value: number;
}
interface ColorPickerProps {
    color: string;
    onChange: (result: ColorResult) => void;
}

type GuidelineType = {
    length: number;
    position: number;
    isHorizontal: boolean;
    id: string;
    line?: Line;
};
type CanvasConfigType = {
    width: number;
    height: number;
    backgroundColor: string;
};
type SnappingConfigType = {
    snappingDistance: number;
};
type CanvasEventHandlers = {
    onObjectMoving: (canvas: Canvas, target: Object$1 | undefined) => void;
    onObjectModified: () => void;
};
type TextAlignType = "left" | "center" | "right" | "justify";
interface TextFormatting {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    textAlign: TextAlignType;
}
declare const SIDEBAR_ITEMS: readonly [{
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
interface SidebarItem {
    icon: IconType;
    label: string;
}

declare const clearGuidelines: (canvas: Canvas, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void) => void;
declare const handleObjectMoving: (canvas: Canvas, movingObject: FabricObject, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void) => void;
declare const setupCanvasEvents: (canvas: Canvas, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void) => (() => void) | undefined;

type DefaultStates = {
    opacity: EffectState;
    shadow: ShadowState;
    textStroke: TextStrokeState;
    shapeRadius: CornerRadiusState;
    background: BackgroundState;
};
declare const getInitialStates: (object: fabric.Object | null) => DefaultStates;
declare const createShadow: (shadowState: ShadowState) => fabric.Shadow;

declare const HEADLINE_SIZES: {
    readonly square: {
        readonly label: "Kare Manşet";
        readonly width: 547;
        readonly height: 574;
    };
    readonly wide: {
        readonly label: "Geniş Manşet";
        readonly width: 979;
        readonly height: 550;
    };
    readonly default: {
        readonly label: "Varsayılan(20'lik Manşet)";
        readonly width: 868;
        readonly height: 488;
    };
};
declare const CANVAS_DEFAULT_CONFIG: {
    readonly width: 868;
    readonly height: 488;
    readonly backgroundColor: "#fff";
};
declare const SNAPPING_CONFIG: {
    readonly snappingDistance: 10;
};
declare const GUIDELINE_STYLES: {
    readonly stroke: "blue";
    readonly strokeWidth: 1;
    readonly selectable: false;
    readonly evented: false;
    readonly strokeDashArray: number[];
    readonly opacity: 0.8;
};
declare const LAYER_ACTIONS: readonly [{
    readonly action: "up";
    readonly icon: react_icons.IconType;
    readonly label: "Up";
}, {
    readonly action: "down";
    readonly icon: react_icons.IconType;
    readonly label: "Down";
}, {
    readonly action: "top";
    readonly icon: react_icons.IconType;
    readonly label: "To forward";
}, {
    readonly action: "bottom";
    readonly icon: react_icons.IconType;
    readonly label: "To bottom";
}];
declare const ALIGN_ACTIONS: readonly [{
    readonly align: "left";
    readonly icon: react_icons.IconType;
}, {
    readonly align: "center";
    readonly icon: react_icons.IconType;
}, {
    readonly align: "right";
    readonly icon: react_icons.IconType;
}, {
    readonly align: "top";
    readonly icon: react_icons.IconType;
}, {
    readonly align: "middle";
    readonly icon: react_icons.IconType;
}, {
    readonly align: "bottom";
    readonly icon: react_icons.IconType;
}];

declare const layerManagement: {
    moveObjectUp(canvas: fabric.Canvas, object: fabric.Object): void;
    moveObjectDown(canvas: fabric.Canvas, object: fabric.Object): void;
    moveObjectToTop(canvas: fabric.Canvas, object: fabric.Object): void;
    moveObjectToBottom(canvas: fabric.Canvas, object: fabric.Object): void;
    alignObject(canvas: fabric.Canvas, object: fabric.Object, align: "left" | "center" | "right" | "top" | "middle" | "bottom"): void;
};

declare const useTextFormatting: (canvas: fabric.Canvas | null, selectedObject: fabric.Object | null) => {
    textFormatting: TextFormatting;
    updateTextFormatting: (property: keyof TextFormatting, value: boolean | TextAlignType) => void;
};

declare const useSidebarState: () => {
    isIconDrawerOpen: boolean;
    setIsIconDrawerOpen: react.Dispatch<react.SetStateAction<boolean>>;
    isHeadlineDrawerOpen: boolean;
    setIsHeadlineDrawerOpen: react.Dispatch<react.SetStateAction<boolean>>;
};

declare const useObjectSelection: (canvas: fabric.Canvas | null) => {
    selectedObject: fabric.FabricObject<Partial<fabric.FabricObjectProps>, fabric.SerializedObjectProps, fabric.ObjectEvents> | null;
    width: string;
    height: string;
    diameter: string;
    color: string;
    opacity: number;
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    letterSpacing: number;
    handleObjectSelection: (object: fabric.Object | null) => void;
    handleWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDiameterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleColorChange: (color: ColorResult) => void;
    handleFontSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFontFamilyChange: (newFontFamily: string) => void;
    handleOpacityChange: (value: number) => void;
    handleLineHeightChange: (value: number) => void;
    handleLetterSpacingChange: (value: number) => void;
};

declare function useCanvasShapes(canvas: Canvas | null): {
    handleAddRectangle: () => void;
    handleAddCircle: () => void;
    handleAddText: () => void;
    handleImageUpload: (file: File) => void;
    handleAddIcon: (iconPath: string, color: string) => void;
};

declare const useCanvasObject: (selectedObject: fabric.Object | null, canvas: fabric.Canvas | null, onObjectUpdate?: () => void) => {
    opacity: EffectState;
    shadow: ShadowState;
    textStroke: TextStrokeState;
    shapeRadius: CornerRadiusState;
    background: BackgroundState;
    handlers: {
        handleOpacityChange: (value: number) => void;
        handleOpacityToggle: (enabled: boolean) => void;
        handleShadowChange: (updates: Partial<ShadowState>) => void;
        handleTextStrokeChange: (updates: Partial<TextStrokeState>) => void;
        handleCornerRadiusChange: (updates: Partial<CornerRadiusState>) => void;
        handleBackgroundChange: (updates: Partial<BackgroundState>) => void;
    };
};

declare const useCanvasInitialization: (canvasRef: RefObject<HTMLCanvasElement>, config: CanvasConfigType, guidelines: GuidelineType[], setGuidelines: (guidelines: GuidelineType[]) => void, setCanvas: (canvas: Canvas | null) => void) => void;

declare function useCanvasEvents(canvas: Canvas | null, handleObjectSelection: (obj: Object$1 | null) => void, clearSettings: () => void): {
    guidelines: GuidelineType[];
    setGuidelines: react.Dispatch<react.SetStateAction<GuidelineType[]>>;
};

type FontFamily = {
    name: string;
    family: string;
    url: string;
};
declare const fontFamilies: FontFamily[];
declare function loadFonts(): void;

export { ALIGN_ACTIONS, type BackgroundState, CANVAS_DEFAULT_CONFIG, type CanvasConfigType, type CanvasEventHandlers, type ColorPickerProps, type ControlProps, type CornerRadiusState, type EffectState, type EffectsProps, type FontFamily, GUIDELINE_STYLES, type GuidelineType, HEADLINE_SIZES, HeadlineEditorCanvas, LAYER_ACTIONS, SIDEBAR_ITEMS, SNAPPING_CONFIG, type ShadowState, type SidebarItem, type SnappingConfigType, type TextAlignType, type TextFormatting, type TextStrokeState, clearGuidelines, createShadow, HeadlineEditorCanvas as default, fontFamilies, getInitialStates, handleObjectMoving, layerManagement, loadFonts, setupCanvasEvents, useCanvasEvents, useCanvasInitialization, useCanvasObject, useCanvasShapes, useObjectSelection, useSidebarState, useTextFormatting };
