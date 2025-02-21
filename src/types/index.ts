import * as fabric from "fabric";

export interface HeadlineEditorProps {
  initialWidth?: number;
  initialHeight?: number;
  onSave?: (dataUrl: string) => void;
  onClose?: () => void;
  defaultBackgroundColor?: string;
  defaultFontFamily?: string;
  defaultFontSize?: number;
  defaultTextColor?: string;
}

export interface CanvasState {
  canvas: fabric.Canvas | null;
  backgroundColor: string;
  objects: fabric.Object[];
}

export interface TextObject extends fabric.IText {
  fontFamily: string;
  fontSize: number;
  fill: string;
}
