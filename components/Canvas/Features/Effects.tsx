"use client";

import React, { memo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { Sparkles } from "lucide-react";
import { EffectsProps } from "../types/effects.types";
import { OpacityControl } from "./OpacityControl";
import { ShadowControl } from "./ShadowControl";
import { TextStrokeControl } from "./TextStrokeControl";
import { ShapeRadiusControl } from "./ShapeRadiusControl";
import { useCanvasObject } from "../hooks/useCanvasObject";
import { EffectsHeader } from "./EffectsHeader";

export const EffectsDrawer: React.FC<EffectsProps> = ({
  selectedObject,
  canvas,
  onObjectUpdate,
}) => {
  const { opacity, shadow, textStroke, shapeRadius, handlers } =
    useCanvasObject(selectedObject, canvas, onObjectUpdate);

  if (!selectedObject || !canvas) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="transition-all active:scale-95">
          <Sparkles className="h-5 w-5 text-gray-600 hover:text-gray-800" />
          Efektler
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-secondary">
        <EffectsHeader onClose={() => {}} />

        <div className="grid gap-6 px-6 py-4 overflow-y-auto max-h-[70vh]">
          <OpacityControl
            value={opacity.value}
            enabled={opacity.enabled}
            onChange={handlers.handleOpacityChange}
            onToggle={handlers.handleOpacityToggle}
          />

          <ShadowControl
            shadow={shadow}
            onChange={handlers.handleShadowChange}
          />

          {selectedObject.type === "i-text" && (
            <TextStrokeControl
              stroke={textStroke}
              onChange={handlers.handleTextStrokeChange}
            />
          )}

          {(selectedObject.type === "rect" ||
            selectedObject.type === "image" ||
            selectedObject.type === "circle") && (
            <ShapeRadiusControl
              radius={shapeRadius}
              onChange={handlers.handleCornerRadiusChange}
              isCircle={selectedObject.type === "circle"}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default memo(EffectsDrawer);
