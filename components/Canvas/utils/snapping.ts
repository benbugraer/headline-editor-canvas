/* eslint-disable @typescript-eslint/no-unused-vars */
import { Canvas, Object as FabricObject } from "fabric";
import { GuidelineType } from "../types/canvas.types";
import { SNAPPING_CONFIG, GUIDELINE_STYLES } from "./constants";

// Guideline ID'leri için enum
enum GuidelineId {
  VerticalLeft = "guideline-vertical-left",
  VerticalRight = "guideline-vertical-right",
  VerticalCenter = "guideline-vertical-center",
  HorizontalTop = "guideline-horizontal-top",
  HorizontalBottom = "guideline-horizontal-bottom",
  HorizontalCenter = "guideline-horizontal-center",
  ObjectVerticalCenter = "guideline-object-vertical-center",
  ObjectHorizontalCenter = "guideline-object-horizontal-center",
  ObjectLeft = "guideline-object-left",
  ObjectRight = "guideline-object-right",
  ObjectTop = "guideline-object-top",
  ObjectBottom = "guideline-object-bottom",
}

// FabricLine sınıfını genişletiyoruz ve data alanını ekliyoruz
interface CustomFabricLineProps extends Partial<FabricObject> {
  data?: { id: GuidelineId };
}

class CustomFabricLine extends FabricObject {
  data?: { id: GuidelineId };

  constructor(
    points: [number, number, number, number],
    options: CustomFabricLineProps
  ) {
    super(points, options);
    this.data = options.data;
  }
}

interface ObjectBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

const calculateObjectBounds = (obj: FabricObject): ObjectBounds => {
  const left = obj.left ?? 0;
  const top = obj.top ?? 0;
  const scaleX = obj.scaleX ?? 1;
  const scaleY = obj.scaleY ?? 1;
  const width = (obj.width ?? 0) * Math.abs(scaleX);
  const height = (obj.height ?? 0) * Math.abs(scaleY);
  const angle = obj.angle ?? 0;

  // Handle rotation
  if (angle === 0) {
    return {
      left,
      top,
      right: left + width,
      bottom: top + height,
      centerX: left + width / 2,
      centerY: top + height / 2,
      width,
      height,
    };
  }

  // Calculate rotated bounds
  const rad = (angle * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const points = [
    { x: left, y: top },
    { x: left + width, y: top },
    { x: left + width, y: top + height },
    { x: left, y: top + height },
  ];

  const rotatedPoints = points.map((p) => {
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = p.x - centerX;
    const dy = p.y - centerY;
    return {
      x: centerX + dx * cos - dy * sin,
      y: centerY + dx * sin + dy * cos,
    };
  });

  const xs = rotatedPoints.map((p) => p.x);
  const ys = rotatedPoints.map((p) => p.y);

  return {
    left: Math.min(...xs),
    right: Math.max(...xs),
    top: Math.min(...ys),
    bottom: Math.max(...ys),
    centerX: left + width / 2,
    centerY: top + height / 2,
    width,
    height,
  };
};

const createGuideline = (
  points: [number, number, number, number],
  guidelineId: GuidelineId,
  canvas: Canvas
): CustomFabricLine => {
  return new CustomFabricLine(points, {
    ...GUIDELINE_STYLES,
    data: { id: guidelineId },
  });
};

const guidelineExists = (canvas: Canvas, guidelineId: GuidelineId): boolean => {
  return canvas
    .getObjects()
    .some(
      (obj): obj is CustomFabricLine =>
        obj instanceof CustomFabricLine && obj.data?.id === guidelineId
    );
};

export const clearGuidelines = (
  canvas: Canvas,
  guidelines: GuidelineType[],
  setGuidelines: (guidelines: GuidelineType[]) => void
): void => {
  setGuidelines([]);
  canvas.requestRenderAll();
};

const checkAlignment = (
  value1: number,
  value2: number,
  threshold: number
): boolean => {
  return Math.abs(value1 - value2) < threshold;
};

const createAlignmentGuideline = (
  canvas: Canvas,
  position: number,
  isHorizontal: boolean,
  guidelineId: GuidelineId,
  newGuidelines: GuidelineType[]
): void => {
  if (!guidelineExists(canvas, guidelineId)) {
    const canvasWidth = canvas.width ?? 0;
    const canvasHeight = canvas.height ?? 0;
    const points: [number, number, number, number] = isHorizontal
      ? [0, position, canvasWidth, position]
      : [position, 0, position, canvasHeight];

    const line = createGuideline(points, guidelineId, canvas);
    newGuidelines.push({
      id: guidelineId,
      line,
      length: isHorizontal ? canvasWidth : canvasHeight,
      position,
      isHorizontal,
    });
    canvas.add(line);
  }
};

export const handleObjectMoving = (
  canvas: Canvas,
  target: FabricObject,
  guidelines: GuidelineType[],
  setGuidelines: (guidelines: GuidelineType[]) => void
): void => {
  const snapThreshold = 10;
  const newGuidelines: GuidelineType[] = [];

  if (!target) return;

  const objectCenter = target.getCenterPoint();
  const objectBounds = target.getBoundingRect();

  // Canvas kenarlarına snapping
  const canvasWidth = canvas.width ?? 0;
  const canvasHeight = canvas.height ?? 0;

  // Sol kenara snapping
  if (Math.abs(objectBounds.left) < snapThreshold) {
    target.set({ left: 0 });
    newGuidelines.push({
      position: 0,
      orientation: "vertical",
    });
  }

  // Sağ kenara snapping
  if (
    Math.abs(objectBounds.left + objectBounds.width - canvasWidth) <
    snapThreshold
  ) {
    target.set({ left: canvasWidth - objectBounds.width });
    newGuidelines.push({
      position: canvasWidth,
      orientation: "vertical",
    });
  }

  // Üst kenara snapping
  if (Math.abs(objectBounds.top) < snapThreshold) {
    target.set({ top: 0 });
    newGuidelines.push({
      position: 0,
      orientation: "horizontal",
    });
  }

  // Alt kenara snapping
  if (
    Math.abs(objectBounds.top + objectBounds.height - canvasHeight) <
    snapThreshold
  ) {
    target.set({ top: canvasHeight - objectBounds.height });
    newGuidelines.push({
      position: canvasHeight,
      orientation: "horizontal",
    });
  }

  // Diğer nesnelere snapping
  canvas.getObjects().forEach((obj) => {
    if (obj === target) return;

    const otherBounds = obj.getBoundingRect();
    const otherCenter = obj.getCenterPoint();

    // Dikey merkez hizalama
    if (Math.abs(objectCenter.x - otherCenter.x) < snapThreshold) {
      target.set({ left: otherCenter.x - target.getScaledWidth() / 2 });
      newGuidelines.push({
        position: otherCenter.x,
        orientation: "vertical",
      });
    }

    // Yatay merkez hizalama
    if (Math.abs(objectCenter.y - otherCenter.y) < snapThreshold) {
      target.set({ top: otherCenter.y - target.getScaledHeight() / 2 });
      newGuidelines.push({
        position: otherCenter.y,
        orientation: "horizontal",
      });
    }

    // Sol kenar hizalama
    if (Math.abs(objectBounds.left - otherBounds.left) < snapThreshold) {
      target.set({ left: otherBounds.left });
      newGuidelines.push({
        position: otherBounds.left,
        orientation: "vertical",
      });
    }

    // Sağ kenar hizalama
    if (
      Math.abs(
        objectBounds.left +
          objectBounds.width -
          (otherBounds.left + otherBounds.width)
      ) < snapThreshold
    ) {
      target.set({
        left: otherBounds.left + otherBounds.width - objectBounds.width,
      });
      newGuidelines.push({
        position: otherBounds.left + otherBounds.width,
        orientation: "vertical",
      });
    }

    // Üst kenar hizalama
    if (Math.abs(objectBounds.top - otherBounds.top) < snapThreshold) {
      target.set({ top: otherBounds.top });
      newGuidelines.push({
        position: otherBounds.top,
        orientation: "horizontal",
      });
    }

    // Alt kenar hizalama
    if (
      Math.abs(
        objectBounds.top +
          objectBounds.height -
          (otherBounds.top + otherBounds.height)
      ) < snapThreshold
    ) {
      target.set({
        top: otherBounds.top + otherBounds.height - objectBounds.height,
      });
      newGuidelines.push({
        position: otherBounds.top + otherBounds.height,
        orientation: "horizontal",
      });
    }
  });

  setGuidelines(newGuidelines);
  canvas.requestRenderAll();
};

// Canvas event'lerini ayarlamak için helper fonksiyon
export const setupCanvasEvents = (
  canvas: Canvas,
  guidelines: GuidelineType[],
  setGuidelines: (guidelines: GuidelineType[]) => void
) => {
  if (!canvas) return;

  // Mevcut event listener'ları temizle
  canvas.off("object:moving");
  canvas.off("object:modified");
  canvas.off("mouse:up");

  // Yeni event listener'ları ekle
  canvas.on("object:moving", (e) => {
    if (e.target) {
      handleObjectMoving(canvas, e.target, guidelines, setGuidelines);
    }
  });

  canvas.on("object:modified", () => {
    clearGuidelines(canvas, guidelines, setGuidelines);
  });

  canvas.on("mouse:up", () => {
    clearGuidelines(canvas, guidelines, setGuidelines);
  });

  // Cleanup fonksiyonunu döndür
  return () => {
    canvas.off("object:moving");
    canvas.off("object:modified");
    canvas.off("mouse:up");
  };
};

// React component'inde kullanımı için örnek:
/*
useEffect(() => {
  if (canvas) {
    const cleanup = setupCanvasEvents(canvas, guidelines, setGuidelines);
    return cleanup;
  }
}, [canvas]);
*/
