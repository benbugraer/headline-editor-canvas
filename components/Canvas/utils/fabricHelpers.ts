import { fabric } from "fabric";
import {
  EffectState,
  ShadowState,
  TextStrokeState,
  CornerRadiusState,
  BackgroundState,
} from "../types/effects.types";

type DefaultStates = {
  opacity: EffectState;
  shadow: ShadowState;
  textStroke: TextStrokeState;
  shapeRadius: CornerRadiusState;
  background: BackgroundState;
};

const defaultStates: DefaultStates = {
  opacity: {
    enabled: false,
    value: 100,
  },
  shadow: {
    enabled: false,
    blur: 15,
    offsetX: 10,
    offsetY: 10,
    color: "#000000",
  },
  textStroke: {
    enabled: false,
    width: 1,
    color: "#000000",
  },
  shapeRadius: {
    enabled: false,
    radius: 10,
  },
  background: {
    enabled: false,
    color: "#ffffff",
    padding: 10,
  },
};

export const getInitialStates = (
  object: fabric.Object | null
): DefaultStates => {
  if (!object || typeof window === "undefined") return defaultStates;

  try {
    const shadow = object.shadow as fabric.Shadow | null;
    const isText = object instanceof fabric.IText;
    const isShape =
      object instanceof fabric.Rect || object instanceof fabric.Image;
    const isCircle = object instanceof fabric.Circle;

    return {
      opacity: {
        enabled: object.opacity !== undefined && object.opacity !== 1,
        value: Math.round((object.opacity ?? 1) * 100),
      },
      shadow: {
        enabled: !!shadow,
        blur: shadow?.blur ?? defaultStates.shadow.blur,
        offsetX: shadow?.offsetX ?? defaultStates.shadow.offsetX,
        offsetY: shadow?.offsetY ?? defaultStates.shadow.offsetY,
        color: shadow?.color ?? defaultStates.shadow.color,
      },
      textStroke: {
        enabled: !!(object.stroke && object.strokeWidth),
        width: object.strokeWidth ?? defaultStates.textStroke.width,
        color: (object.stroke as string) ?? defaultStates.textStroke.color,
      },
      shapeRadius: {
        ...defaultStates.shapeRadius,
        ...(isCircle
          ? {
              enabled: true,
              radius:
                (object as fabric.Circle).radius ??
                defaultStates.shapeRadius.radius,
            }
          : isShape && object instanceof fabric.Rect
          ? {
              enabled: !!(object as fabric.Rect).rx,
              radius:
                (object as fabric.Rect).rx ?? defaultStates.shapeRadius.radius,
            }
          : {}),
      },
      background: {
        ...defaultStates.background,
        enabled: !!object.backgroundColor,
        color:
          (object.backgroundColor as string) ?? defaultStates.background.color,
        padding: object.padding ?? defaultStates.background.padding,
      },
    };
  } catch (error) {
    console.error("Error getting initial states:", error);
    return defaultStates;
  }
};

export const createShadow = (
  shadowState: ShadowState
): fabric.Shadow | null => {
  if (typeof window === "undefined") return null;

  try {
    return new fabric.Shadow({
      color: shadowState.color,
      blur: shadowState.blur,
      offsetX: shadowState.offsetX,
      offsetY: shadowState.offsetY,
    });
  } catch (error) {
    console.error("Error creating shadow:", error);
    return null;
  }
};
