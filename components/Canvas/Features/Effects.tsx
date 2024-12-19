"use client";

import React, { useCallback, useEffect, useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import * as fabric from "fabric";
import { ColorResult } from "react-color";
import { ColorPicker } from "../Features/ColorPicker";

interface EffectsDrawerProps {
  selectedObject: fabric.Object | null;
  canvas: fabric.Canvas | null;
  onObjectUpdate?: () => void;
}

export const EffectsDrawer: React.FC<EffectsDrawerProps> = ({
  selectedObject,
  canvas,
  onObjectUpdate,
}) => {
  const [blur, setBlur] = useState(100);
  const [blurEnabled, setBlurEnabled] = useState(true);

  const [shadow, setShadow] = useState({
    enabled: false,
    color: "#000000",
    blur: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const [background, setBackground] = useState({
    enabled: false,
    color: "#ffffff",
    padding: 0,
  });

  const [textStroke, setTextStroke] = useState({
    enabled: false,
    width: 0,
    color: "#000000",
  });

  const [shapeRadius, setShapeRadius] = useState({
    enabled: false,
    radius: 0,
  });

  useEffect(() => {
    if (selectedObject) {
      // Opaklık/Blur
      const currentOpacity = selectedObject.opacity ?? 1;
      setBlur(Math.round(currentOpacity * 100));
      setBlurEnabled(currentOpacity < 1);

      // Gölge
      const currentShadow = selectedObject.shadow as fabric.Shadow;
      setShadow((prev) => ({
        ...prev,
        enabled: !!currentShadow,
        color: currentShadow?.color || "#000000",
        blur: currentShadow?.blur || 0,
        offsetX: currentShadow?.offsetX || 0,
        offsetY: currentShadow?.offsetY || 0,
      }));

      // Arka Plan
      if (selectedObject.type === "i-text") {
        const textObject = selectedObject as fabric.IText;
        setBackground({
          enabled: !!textObject.textBackgroundColor,
          color: textObject.textBackgroundColor || "#ffffff",
          padding: textObject.padding || 0,
        });
      } else {
        setBackground({
          enabled: !!selectedObject.backgroundColor,
          color: selectedObject.backgroundColor || "#ffffff",
          padding: 0,
        });
      }

      // Metin Çizgisi
      if (selectedObject.type === "i-text") {
        const textObject = selectedObject as fabric.IText;
        setTextStroke({
          enabled: (textObject.strokeWidth ?? 0) > 0,
          width: textObject.strokeWidth || 0,
          color: (textObject.stroke as string) || "#000000",
        });
      }

      // Shape Radius için circle kontrolü eklendi
      if (
        selectedObject.type === "rect" ||
        selectedObject.type === "image" ||
        selectedObject.type === "circle"
      ) {
        let currentRadius = 0;

        if (selectedObject.type === "circle") {
          const circle = selectedObject as fabric.Circle;
          currentRadius = circle.radius || 0;
        } else {
          const rect = selectedObject as fabric.Rect;
          currentRadius = rect.rx || 0;
        }

        setShapeRadius({
          enabled: currentRadius > 0,
          radius: currentRadius,
        });
      }
    }
  }, [selectedObject]);

  const applyBlur = useCallback(
    (value: number) => {
      if (selectedObject && canvas && blurEnabled) {
        selectedObject.set("opacity", value / 100);
        setBlur(value);
        canvas.renderAll();
        onObjectUpdate?.();
      }
    },
    [selectedObject, canvas, onObjectUpdate, blurEnabled]
  );

  const applyTextStroke = useCallback(
    (width: number, color: string) => {
      if (
        selectedObject &&
        selectedObject.type === "i-text" &&
        canvas &&
        textStroke.enabled
      ) {
        const textObject = selectedObject as fabric.IText;
        textObject.set({
          stroke: color,
          strokeWidth: width,
        });

        setTextStroke((prev) => ({ ...prev, width, color }));
        canvas.renderAll();
        onObjectUpdate?.();
      }
    },
    [selectedObject, canvas, onObjectUpdate, textStroke.enabled]
  );

  const applyShadow = useCallback(() => {
    if (selectedObject && canvas) {
      if (!shadow.enabled) {
        selectedObject.set("shadow", null);
      } else {
        selectedObject.set(
          "shadow",
          new fabric.Shadow({
            color: shadow.color,
            blur: shadow.blur,
            offsetX: shadow.offsetX,
            offsetY: shadow.offsetY,
          })
        );
      }
      canvas.renderAll();
      onObjectUpdate?.();
    }
  }, [selectedObject, canvas, shadow, onObjectUpdate]);

  const applyBackground = useCallback(() => {
    if (selectedObject && canvas) {
      if (!background.enabled) {
        selectedObject.set({
          backgroundColor: undefined,
          textBackgroundColor: undefined,
          padding: 0,
        });

        if (
          selectedObject.type === "rect" ||
          selectedObject.type === "image" ||
          selectedObject.type === "circle"
        ) {
          (selectedObject as fabric.Rect).set({
            rx: 0,
            ry: 0,
          });
        }
      } else {
        if (selectedObject.type === "i-text") {
          const textObject = selectedObject as fabric.IText;
          textObject.set({
            textBackgroundColor: background.color,
            padding: background.padding,
          });
          // Rounded background for text requires a custom solution
        } else {
          selectedObject.set({
            backgroundColor: background.color,
            padding: background.padding,
          });
        }
      }
      canvas.renderAll();
      onObjectUpdate?.();
    }
  }, [selectedObject, canvas, background, onObjectUpdate]);

  const handleRadiusChange = (value: number) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    // First update the object
    if (selectedObject && canvas) {
      if (selectedObject.type === "circle") {
        (selectedObject as fabric.Circle).set({
          radius: clampedValue,
        });
      } else if (
        selectedObject.type === "rect" ||
        selectedObject.type === "image"
      ) {
        (selectedObject as fabric.Rect).set({
          rx: clampedValue,
          ry: clampedValue,
        });
      }
      // Immediate canvas update
      canvas.requestRenderAll();
      onObjectUpdate?.();
    }

    // Then update the state
    setShapeRadius((prev) => ({
      ...prev,
      radius: clampedValue,
    }));
  };

  if (!selectedObject || !canvas) return null;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="transition-all  active:scale-95">
          <Sparkles className="h-5 w-5 text-gray-600 hover:text-gray-800" />
          Efektler
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-secondary">
        <DrawerHeader className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <DrawerTitle className="text-xl font-bold text-gray-800">
              Nesne Efektleri
            </DrawerTitle>
            <DrawerDescription className="text-gray-500 mt-1">
              Seçili nesnenin görsel özelliklerini özelleştirin
            </DrawerDescription>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="text-red-500">
              <X className="h-6 w-6" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="grid gap-6 px-6 py-4 overflow-y-auto max-h-[70vh]">
          {/* Opacity/Blur Effect */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-gray-700 font-medium">Opaklık</Label>
              <Switch
                checked={blurEnabled}
                onCheckedChange={(checked) => {
                  setBlurEnabled(checked);
                  if (!checked) {
                    setBlur(100);
                    selectedObject.set("opacity", 1);
                  } else {
                    selectedObject.set("opacity", blur / 100);
                  }
                  canvas.renderAll();
                  onObjectUpdate?.();
                }}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
            {blurEnabled && (
              <Slider
                value={[blur]}
                onValueChange={(val) => applyBlur(val[0])}
                max={100}
                step={1}
                className="mt-2"
              />
            )}
          </div>

          {/* Shadow Effect */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-gray-700 font-medium">Gölge Efekti</Label>
              <Switch
                checked={shadow.enabled}
                onCheckedChange={(checked) => {
                  setShadow((prev) => ({ ...prev, enabled: checked }));
                  if (!checked) {
                    selectedObject.set("shadow", null);
                  } else {
                    applyShadow();
                  }
                  canvas.renderAll();
                  onObjectUpdate?.();
                }}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            {shadow.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-600 text-sm">Bulanıklık</Label>
                  <Slider
                    value={[shadow.blur]}
                    onValueChange={(val) => {
                      setShadow((prev) => ({ ...prev, blur: val[0] }));
                      applyShadow();
                    }}
                    max={50}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <ColorPicker
                    color={shadow.color}
                    onChange={(colorResult: ColorResult) => {
                      setShadow((prev) => ({
                        ...prev,
                        color: colorResult.hex,
                      }));
                      applyShadow();
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600 text-sm">X Kaydırma</Label>
                  <Slider
                    value={[shadow.offsetX]}
                    onValueChange={(val) => {
                      setShadow((prev) => ({ ...prev, offsetX: val[0] }));
                      applyShadow();
                    }}
                    min={-20}
                    max={20}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600 text-sm">Y Kaydırma</Label>
                  <Slider
                    value={[shadow.offsetY]}
                    onValueChange={(val) => {
                      setShadow((prev) => ({ ...prev, offsetY: val[0] }));
                      applyShadow();
                    }}
                    min={-20}
                    max={20}
                    step={1}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Text Stroke (Only for text objects) */}
          {selectedObject.type === "i-text" && (
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-gray-700 font-medium">
                  Metin Çizgisi
                </Label>
                <Switch
                  checked={textStroke.enabled}
                  onCheckedChange={(checked) => {
                    setTextStroke((prev) => ({ ...prev, enabled: checked }));
                    if (!checked) {
                      const textObject = selectedObject as fabric.IText;
                      textObject.set({
                        stroke: undefined,
                        strokeWidth: 0,
                      });
                      setTextStroke({
                        enabled: false,
                        width: 0,
                        color: "#000000",
                      });
                    }
                    canvas.renderAll();
                    onObjectUpdate?.();
                  }}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>
              {textStroke.enabled && (
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={textStroke.width}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setTextStroke((prev) => ({ ...prev, width: value }));
                      applyTextStroke(value, textStroke.color);
                    }}
                    className="w-16 border border-gray-300 rounded px-2 py-1"
                  />
                  <ColorPicker
                    color={textStroke.color}
                    onChange={(colorResult: ColorResult) =>
                      applyTextStroke(textStroke.width, colorResult.hex)
                    }
                  />
                </div>
              )}
            </div>
          )}

          {/* Shape Radius Control - circle kontrolü eklendi */}
          {(selectedObject.type === "rect" ||
            selectedObject.type === "image" ||
            selectedObject.type === "circle") && (
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-gray-700 font-medium">
                  {selectedObject.type === "circle"
                    ? "Daire Boyutu"
                    : "Köşe Yuvarlaklığı"}
                </Label>
                <Switch
                  checked={shapeRadius.enabled}
                  onCheckedChange={(checked) => {
                    setShapeRadius((prev) => ({ ...prev, enabled: checked }));
                    if (!checked) {
                      handleRadiusChange(0);
                    }
                  }}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>

              {shapeRadius.enabled && (
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Slider
                        value={[shapeRadius.radius]}
                        onValueChange={(val) => handleRadiusChange(val[0])}
                        max={100}
                        step={1}
                      />
                    </div>
                    <input
                      type="number"
                      value={shapeRadius.radius}
                      onChange={(e) => {
                        const value = Number(e.target.value) || 0;
                        handleRadiusChange(value);
                      }}
                      className="w-16 h-8 border border-gray-300 rounded px-2 text-sm"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Background Color */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-gray-700 font-medium">Arka Plan</Label>
              <Switch
                checked={background.enabled}
                onCheckedChange={(checked) => {
                  setBackground((prev) => ({ ...prev, enabled: checked }));
                  if (!checked) {
                    if (selectedObject.type === "i-text") {
                      (selectedObject as fabric.IText).set({
                        textBackgroundColor: undefined,
                        padding: 0,
                      });
                    } else {
                      selectedObject.set({
                        backgroundColor: undefined,
                        padding: 0,
                      });
                      if (
                        selectedObject.type === "rect" ||
                        selectedObject.type === "image" ||
                        selectedObject.type === "circle"
                      ) {
                        (selectedObject as fabric.Rect).set({
                          rx: 0,
                          ry: 0,
                        });
                      }
                    }
                    canvas.renderAll();
                    onObjectUpdate?.();
                  } else {
                    applyBackground();
                  }
                }}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            {background.enabled && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-600 text-sm">
                    Arka Plan Rengi
                  </Label>
                  <ColorPicker
                    color={background.color}
                    onChange={(colorResult: ColorResult) => {
                      setBackground((prev) => ({
                        ...prev,
                        color: colorResult.hex,
                      }));
                      setTimeout(applyBackground, 0);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600 text-sm">
                    İç Boşluk (Padding)
                  </Label>
                  <Slider
                    value={[background.padding]}
                    onValueChange={(val) => {
                      setBackground((prev) => ({ ...prev, padding: val[0] }));
                      setTimeout(applyBackground, 0);
                    }}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EffectsDrawer;
