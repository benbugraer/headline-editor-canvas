import { useCallback, useEffect, useMemo, useState } from "react";
import * as fabric from "fabric";
import {
  EffectState,
  ShadowState,
  TextStrokeState,
  BackgroundState,
  CornerRadiusState,
} from "../types/effects.types";
import { getInitialStates, createShadow } from "../utils/fabricHelpers";
import { debounce } from "lodash";

export const useCanvasObject = (
  selectedObject: fabric.Object | null,
  canvas: fabric.Canvas | null,
  onObjectUpdate?: () => void
) => {
  // Initialize states with memoized initial values
  const initialStates = useMemo(
    () => getInitialStates(selectedObject),
    [selectedObject]
  );

  const [opacity, setOpacity] = useState<EffectState>(initialStates.opacity);
  const [shadow, setShadow] = useState<ShadowState>(initialStates.shadow);
  const [textStroke, setTextStroke] = useState<TextStrokeState>(
    initialStates.textStroke
  );
  const [shapeRadius, setShapeRadius] = useState<CornerRadiusState>(
    initialStates.shapeRadius
  );
  const [background, setBackground] = useState<BackgroundState>(
    initialStates.background
  );

  // Debounced render function for performance
  const debouncedRender = useMemo(
    () =>
      debounce(() => {
        if (canvas) {
          canvas.requestRenderAll();
          onObjectUpdate?.();
        }
      }, 16), // ~60fps
    [canvas, onObjectUpdate]
  );

  // Cleanup debounced function
  useEffect(() => {
    return () => {
      debouncedRender.cancel();
    };
  }, [debouncedRender]);

  // Opacity handlers with error handling
  const handleOpacityChange = useCallback(
    (value: number) => {
      if (!selectedObject || !canvas || !opacity.enabled) return;
      try {
        const normalizedValue = Math.max(0, Math.min(100, value));
        selectedObject.set("opacity", normalizedValue / 100);
        setOpacity((prev) => ({ ...prev, value: normalizedValue }));
        debouncedRender();
      } catch (error) {
        console.error("Error changing opacity:", error);
      }
    },
    [selectedObject, canvas, opacity.enabled, debouncedRender]
  );

  const handleOpacityToggle = useCallback(
    (enabled: boolean) => {
      if (!selectedObject || !canvas) return;
      try {
        setOpacity((prev) => {
          const newOpacity = { ...prev, enabled };
          selectedObject.set(
            "opacity",
            newOpacity.enabled ? newOpacity.value / 100 : 1
          );
          debouncedRender();
          return newOpacity;
        });
      } catch (error) {
        console.error("Error toggling opacity:", error);
      }
    },
    [selectedObject, canvas, debouncedRender]
  );

  // Shadow handlers with validation
  const handleShadowChange = useCallback(
    (updates: Partial<ShadowState>) => {
      if (!selectedObject || !canvas) return;
      try {
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

          // Validate shadow values
          newShadow.blur = Math.max(0, newShadow.blur);
          newShadow.offsetX = Math.min(100, Math.max(-100, newShadow.offsetX));
          newShadow.offsetY = Math.min(100, Math.max(-100, newShadow.offsetY));

          selectedObject.set(
            "shadow",
            newShadow.enabled ? createShadow(newShadow) : null
          );
          debouncedRender();
          return newShadow;
        });
      } catch (error) {
        console.error("Error changing shadow:", error);
      }
    },
    [selectedObject, canvas, debouncedRender]
  );

  // Text stroke handlers with validation
  const handleTextStrokeChange = useCallback(
    (updates: Partial<TextStrokeState>) => {
      if (!selectedObject || !canvas || selectedObject.type !== "i-text")
        return;
      try {
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
          } else {
            // Validate stroke width
            newStroke.width = Math.max(0, Math.min(20, newStroke.width));

            textObject.set({
              stroke: newStroke.color,
              strokeWidth: newStroke.width * 2,
              strokeUniform: true,
              paintFirst: "stroke",
              strokeLineJoin: "round",
              strokeLineCap: "round",
            });

            if (newStroke.width > 2) {
              const currentShadow = textObject.shadow as fabric.Shadow;
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

          debouncedRender();
          return newStroke;
        });
      } catch (error) {
        console.error("Error changing text stroke:", error);
      }
    },
    [selectedObject, canvas, debouncedRender]
  );

  // Shape radius handlers with validation
  const handleCornerRadiusChange = useCallback(
    (updates: Partial<CornerRadiusState>) => {
      if (!selectedObject || !canvas) return;
      try {
        setShapeRadius((prev) => {
          const newCornerRadius = { ...prev, ...updates };

          if (
            selectedObject.type === "rect" ||
            selectedObject.type === "image"
          ) {
            const fabricObject = selectedObject as fabric.Rect | fabric.Image;

            const width = fabricObject.width || 0;
            const height = fabricObject.height || 0;
            const scaleX = fabricObject.scaleX || 1;
            const scaleY = fabricObject.scaleY || 1;

            const realWidth = width * Math.abs(scaleX);
            const realHeight = height * Math.abs(scaleY);

            // Normalize and validate radius
            const normalizedRadius =
              Math.max(0, Math.min(140, newCornerRadius.radius)) / 140;
            const maxRadius = Math.min(realWidth, realHeight) / 2;
            const effectiveRadius = maxRadius * normalizedRadius;

            const rx = newCornerRadius.enabled
              ? effectiveRadius / Math.abs(scaleX)
              : 0;
            const ry = newCornerRadius.enabled
              ? effectiveRadius / Math.abs(scaleY)
              : 0;

            fabricObject.set({ rx, ry });
            fabricObject.setCoords();
          }

          debouncedRender();
          return newCornerRadius;
        });
      } catch (error) {
        console.error("Error changing corner radius:", error);
      }
    },
    [selectedObject, canvas, debouncedRender]
  );

  // Background handlers with validation
  const handleBackgroundChange = useCallback(
    (updates: Partial<BackgroundState>) => {
      if (!selectedObject || !canvas) return;
      try {
        setBackground((prev) => {
          const newBackground = { ...prev, ...updates };

          // Validate padding
          newBackground.padding = Math.max(
            0,
            Math.min(50, newBackground.padding)
          );

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

          debouncedRender();
          return newBackground;
        });
      } catch (error) {
        console.error("Error changing background:", error);
      }
    },
    [selectedObject, canvas, debouncedRender]
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
      handleCornerRadiusChange,
      handleBackgroundChange,
    },
  };
};
