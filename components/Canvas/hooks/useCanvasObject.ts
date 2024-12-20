import { useCallback, useEffect, useMemo, useState } from "react";
import * as fabric from "fabric"; // v6
import {
  EffectState,
  ShadowState,
  TextStrokeState,
  ShapeRadiusState,
  BackgroundState,
} from "../types/effects.types";
import { getInitialStates, createShadow } from "../utils/fabricHelpers";

export const useCanvasObject = (
  selectedObject: fabric.Object | null,
  canvas: fabric.Canvas | null,
  onObjectUpdate?: () => void
) => {
  // Initialize states
  const initialStates = useMemo(
    () => getInitialStates(selectedObject),
    [selectedObject]
  );

  const [opacity, setOpacity] = useState<EffectState>(initialStates.opacity);
  const [shadow, setShadow] = useState<ShadowState>(initialStates.shadow);
  const [textStroke, setTextStroke] = useState<TextStrokeState>(
    initialStates.textStroke
  );
  const [shapeRadius, setShapeRadius] = useState<ShapeRadiusState>(
    initialStates.shapeRadius
  );
  const [background, setBackground] = useState<BackgroundState>(
    initialStates.background
  );

  // Opacity handlers
  const handleOpacityChange = useCallback(
    (value: number) => {
      if (!selectedObject || !canvas || !opacity.enabled) return;

      selectedObject.set("opacity", value / 100);
      setOpacity((prev) => ({ ...prev, value }));
      canvas.requestRenderAll();
      onObjectUpdate?.();
    },
    [selectedObject, canvas, opacity.enabled, onObjectUpdate]
  );

  const handleOpacityToggle = useCallback(
    (enabled: boolean) => {
      if (!selectedObject || !canvas) return;

      setOpacity((prev) => {
        const newOpacity = { ...prev, enabled };
        selectedObject.set(
          "opacity",
          newOpacity.enabled ? newOpacity.value / 100 : 1
        );
        canvas.requestRenderAll();
        onObjectUpdate?.();
        return newOpacity;
      });
    },
    [selectedObject, canvas, onObjectUpdate]
  );

  // Shadow handlers
  const handleShadowChange = useCallback(
    (updates: Partial<ShadowState>) => {
      if (!selectedObject || !canvas) return;

      setShadow((prev) => {
        const currentShadow = selectedObject.shadow as fabric.Shadow;
        const newShadow = {
          ...prev,
          color: currentShadow?.color || "#000000",
          blur: currentShadow?.blur || 0,
          offsetX: currentShadow?.offsetX || 0,
          offsetY: currentShadow?.offsetY || 0,
          ...updates,
        };

        selectedObject.set(
          "shadow",
          newShadow.enabled ? createShadow(newShadow) : null
        );
        canvas.requestRenderAll();
        onObjectUpdate?.();
        return newShadow;
      });
    },
    [selectedObject, canvas, onObjectUpdate]
  );

  // Text stroke handlers
  const handleTextStrokeChange = useCallback(
    (updates: Partial<TextStrokeState>) => {
      if (!selectedObject || !canvas || selectedObject.type !== "i-text")
        return;

      setTextStroke((prev) => {
        const newStroke = { ...prev, ...updates };
        const textObject = selectedObject as fabric.IText;

        if (!newStroke.enabled) {
          textObject.set({
            stroke: undefined,
            strokeWidth: 0,
            strokeUniform: false,
            paintFirst: "fill",
          });
          // Shadow ayarlarını değiştirmiyoruz, mevcut shadow korunacak
        } else {
          // Ana stroke ayarları
          textObject.set({
            stroke: newStroke.color,
            strokeWidth: newStroke.width * 2,
            strokeUniform: true,
            paintFirst: "stroke",
            strokeLineJoin: "round",
            strokeLineCap: "round",
          });

          // Sadece stroke width > 2 ise ve stroke aktifse shadow ekle
          if (newStroke.width > 2) {
            const currentShadow = textObject.shadow as fabric.Shadow;
            // Eğer mevcut bir shadow varsa, onu koruyalım
            if (!currentShadow) {
              textObject.set({
                shadow: new fabric.Shadow({
                  color: newStroke.color,
                  blur: newStroke.width / 2,
                  offsetX: 0,
                  offsetY: 0,
                }),
              });
            }
          }
        }

        canvas.requestRenderAll();
        onObjectUpdate?.();
        return newStroke;
      });
    },
    [selectedObject, canvas, onObjectUpdate]
  );

  // Shape radius handlers
  const handleShapeRadiusChange = useCallback(
    (updates: Partial<ShapeRadiusState>) => {
      if (!selectedObject || !canvas) return;

      setShapeRadius((prev) => {
        const newRadius = { ...prev, ...updates };

        if (selectedObject.type === "circle") {
          (selectedObject as fabric.Circle).set({
            radius: newRadius.enabled ? newRadius.radius : 0,
          });
        } else if (
          selectedObject.type === "rect" ||
          selectedObject.type === "image"
        ) {
          (selectedObject as fabric.Rect).set({
            rx: newRadius.enabled ? newRadius.radius : 0,
            ry: newRadius.enabled ? newRadius.radius : 0,
          });
        }

        canvas.requestRenderAll();
        onObjectUpdate?.();
        return newRadius;
      });
    },
    [selectedObject, canvas, onObjectUpdate]
  );

  // Background handlers
  const handleBackgroundChange = useCallback(
    (updates: Partial<BackgroundState>) => {
      if (!selectedObject || !canvas) return;

      setBackground((prev) => {
        const newBackground = { ...prev, ...updates };

        if (selectedObject.type === "i-text") {
          const textObject = selectedObject as fabric.IText;
          textObject.set({
            textBackgroundColor: newBackground.enabled
              ? newBackground.color
              : undefined,
            padding: newBackground.enabled ? newBackground.padding : 0,
          });
        } else {
          selectedObject.set({
            backgroundColor: newBackground.enabled
              ? newBackground.color
              : undefined,
            padding: newBackground.enabled ? newBackground.padding : 0,
          });
        }

        canvas.requestRenderAll();
        onObjectUpdate?.();
        return newBackground;
      });
    },
    [selectedObject, canvas, onObjectUpdate]
  );

  // Reset effects when selected object changes
  useEffect(() => {
    if (selectedObject) {
      setOpacity(initialStates.opacity);
      setShadow(initialStates.shadow);
      setTextStroke(initialStates.textStroke);
      setShapeRadius(initialStates.shapeRadius);
      setBackground(initialStates.background);
    }
  }, [selectedObject, initialStates]);

  return {
    opacity,
    shadow,
    textStroke,
    shapeRadius,
    background,
    handlers: {
      handleOpacityChange,
      handleOpacityToggle,
      handleShadowChange,
      handleTextStrokeChange,
      handleShapeRadiusChange,
      handleBackgroundChange,
    },
  };
};
