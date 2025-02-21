import React from 'react';
import * as fabric from 'fabric';

interface HeadlineEditorProps {
    initialWidth?: number;
    initialHeight?: number;
    onSave?: (dataUrl: string) => void;
    onClose?: () => void;
    defaultBackgroundColor?: string;
    defaultFontFamily?: string;
    defaultFontSize?: number;
    defaultTextColor?: string;
}
interface CanvasState {
    canvas: fabric.Canvas | null;
    backgroundColor: string;
    objects: fabric.Object[];
}
interface TextObject extends fabric.IText {
    fontFamily: string;
    fontSize: number;
    fill: string;
}

declare const HeadlineEditor: React.FC<HeadlineEditorProps>;

export { type CanvasState, HeadlineEditor, type HeadlineEditorProps, type TextObject };
