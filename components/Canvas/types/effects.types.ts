import * as fabric from "fabric"; // v6
import { ColorResult } from "react-color";

export interface EffectsProps {
  selectedObject: fabric.Object | null;
  canvas: fabric.Canvas | null;
  onObjectUpdate?: () => void;
}

export interface EffectState {
  enabled: boolean;
  value: number;
}

export interface ShadowState {
  enabled: boolean;
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
}

export interface BackgroundState {
  enabled: boolean;
  color: string;
  padding: number;
}

export interface TextStrokeState {
  enabled: boolean;
  width: number;
  color: string;
}

export interface CornerRadiusState {
  enabled: boolean;
  radius: number;
  cornerStyle?: "rx" | "percentage"; // Yeni eklenen özellik
}
export interface ControlProps {
  onChange: (value: number) => void;
  onToggle: (enabled: boolean) => void;
  enabled: boolean;
  value: number;
}

export interface ColorPickerProps {
  color: string;
  onChange: (result: ColorResult) => void;
}
