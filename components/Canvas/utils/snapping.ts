import { Canvas, Object as FabricObject, Line as FabricLine } from "fabric";
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
}

// FabricLine sınıfını genişletiyoruz ve data alanını ekliyoruz
class CustomFabricLine extends FabricLine {
  data?: { id: GuidelineId };
}

const calculateObjectBounds = (obj: FabricObject) => {
  const left = obj.left ?? 0;
  const top = obj.top ?? 0;
  const scaleX = obj.scaleX ?? 1;
  const scaleY = obj.scaleY ?? 1;
  const width = (obj.width ?? 0) * scaleX;
  const height = (obj.height ?? 0) * scaleY;

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
};

const createGuideline = (
  points: number[],
  guidelineId: GuidelineId,
  canvas: Canvas
): CustomFabricLine => {
  return new CustomFabricLine(points, {
    ...GUIDELINE_STYLES,
    data: { id: guidelineId }, // ID'yi data objesi içinde saklıyoruz
  });
};

const guidelineExists = (canvas: Canvas, guidelineId: GuidelineId): boolean => {
  if (!canvas) return false;
  return canvas
    .getObjects()
    .some((obj) => (obj as CustomFabricLine).data?.id === guidelineId);
};

export const handleObjectMoving = (
  canvas: Canvas,
  obj: FabricObject | undefined,
  guidelines: GuidelineType[],
  setGuidelines: (guidelines: GuidelineType[]) => void
): void => {
  if (!canvas || !obj) return;

  const canvasWidth = canvas.width ?? 0;
  const canvasHeight = canvas.height ?? 0;
  const bounds = calculateObjectBounds(obj);
  const newGuidelines: GuidelineType[] = [];
  let snapped = false;

  const snapPoints = [
    {
      condition: Math.abs(bounds.left) < SNAPPING_CONFIG.snappingDistance,
      snap: () => ({ left: 0 }),
      guideline: () =>
        createGuideline(
          [0, 0, 0, canvasHeight],
          GuidelineId.VerticalLeft,
          canvas
        ),
      id: GuidelineId.VerticalLeft,
    },
    {
      condition: Math.abs(bounds.top) < SNAPPING_CONFIG.snappingDistance,
      snap: () => ({ top: 0 }),
      guideline: () =>
        createGuideline(
          [0, 0, canvasWidth, 0],
          GuidelineId.HorizontalTop,
          canvas
        ),
      id: GuidelineId.HorizontalTop,
    },
    {
      condition:
        Math.abs(bounds.right - canvasWidth) < SNAPPING_CONFIG.snappingDistance,
      snap: () => ({ left: canvasWidth - bounds.width }),
      guideline: () =>
        createGuideline(
          [canvasWidth, 0, canvasWidth, canvasHeight],
          GuidelineId.VerticalRight,
          canvas
        ),
      id: GuidelineId.VerticalRight,
    },
    {
      condition:
        Math.abs(bounds.bottom - canvasHeight) <
        SNAPPING_CONFIG.snappingDistance,
      snap: () => ({ top: canvasHeight - bounds.height }),
      guideline: () =>
        createGuideline(
          [0, canvasHeight, canvasWidth, canvasHeight],
          GuidelineId.HorizontalBottom,
          canvas
        ),
      id: GuidelineId.HorizontalBottom,
    },
    {
      condition:
        Math.abs(bounds.centerX - canvasWidth / 2) <
        SNAPPING_CONFIG.snappingDistance,
      snap: () => ({ left: canvasWidth / 2 - bounds.width / 2 }),
      guideline: () =>
        createGuideline(
          [canvasWidth / 2, 0, canvasWidth / 2, canvasHeight],
          GuidelineId.VerticalCenter,
          canvas
        ),
      id: GuidelineId.VerticalCenter,
    },
    {
      condition:
        Math.abs(bounds.centerY - canvasHeight / 2) <
        SNAPPING_CONFIG.snappingDistance,
      snap: () => ({ top: canvasHeight / 2 - bounds.height / 2 }),
      guideline: () =>
        createGuideline(
          [0, canvasHeight / 2, canvasWidth, canvasHeight / 2],
          GuidelineId.HorizontalCenter,
          canvas
        ),
      id: GuidelineId.HorizontalCenter,
    },
  ];

  snapPoints.forEach((point) => {
    if (point.condition) {
      obj.set(point.snap());
      if (!guidelineExists(canvas, point.id)) {
        const line = point.guideline();
        newGuidelines.push({ id: point.id, line });
        canvas.add(line);
      }
      snapped = true;
    }
  });

  if (!snapped) {
    clearGuidelines(canvas, guidelines, setGuidelines);
  } else {
    setGuidelines(newGuidelines);
  }

  canvas.renderAll();
};

export const clearGuidelines = (
  canvas: Canvas,
  guidelines: GuidelineType[],
  setGuidelines: (guidelines: GuidelineType[]) => void
): void => {
  if (!canvas) return;

  canvas
    .getObjects()
    .filter(
      (obj) =>
        (obj as CustomFabricLine).data?.id &&
        Object.values(GuidelineId).includes((obj as CustomFabricLine).data.id)
    )
    .forEach((obj) => canvas.remove(obj));

  setGuidelines([]);
  canvas.renderAll();
};
