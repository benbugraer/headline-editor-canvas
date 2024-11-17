/* eslint-disable @typescript-eslint/no-unused-vars */
import { Canvas, FabricObject, Line as FabricLine } from "fabric";
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
interface CustomFabricLineProps extends Partial<FabricObject> {
  data?: { id: GuidelineId };
}

class CustomFabricLine extends FabricLine {
  data?: { id: GuidelineId };

  constructor(
    points: [number, number, number, number],
    options: CustomFabricLineProps
  ) {
    super(points, options);
    this.data = options.data;
  }
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
  points: [number, number, number, number],
  guidelineId: GuidelineId,
  canvas: Canvas
): CustomFabricLine => {
  return new CustomFabricLine(points, {
    ...GUIDELINE_STYLES,
    data: { id: guidelineId },
    strokeDashArray: [5, 5] as number[],
    selectable: false,
    evented: false,
  });
};

const guidelineExists = (canvas: Canvas, guidelineId: GuidelineId): boolean => {
  if (!canvas) return false;
  return canvas
    .getObjects()
    .some(
      (obj) => obj instanceof CustomFabricLine && obj.data?.id === guidelineId
    );
};

export const clearGuidelines = (
  canvas: Canvas,
  guidelines: GuidelineType[],
  setGuidelines: (guidelines: GuidelineType[]) => void
): void => {
  if (!canvas) return;

  // Tüm guideline objelerini bul
  const guidelineObjects = canvas
    .getObjects()
    .filter((obj): obj is CustomFabricLine => {
      return (
        obj instanceof CustomFabricLine &&
        obj.data !== undefined &&
        Object.values(GuidelineId).includes(obj.data.id)
      );
    });

  // Bulunan guideline'ları canvas'tan kaldır
  guidelineObjects.forEach((obj) => {
    canvas.remove(obj);
  });

  // State'i temizle
  setGuidelines([]);

  // Canvas'ı güncelle
  canvas.requestRenderAll();
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

  // Snapping noktalarını tanımla
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
      isHorizontal: false,
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
      isHorizontal: true,
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
      isHorizontal: false,
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
      isHorizontal: true,
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
      isHorizontal: false,
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
      isHorizontal: true,
    },
  ];

  // Snapping noktalarını kontrol et
  snapPoints.forEach((point) => {
    if (point.condition) {
      obj.set(point.snap());
      if (!guidelineExists(canvas, point.id)) {
        const line = point.guideline();
        newGuidelines.push({
          id: point.id,
          line,
          length: point.isHorizontal ? canvasWidth : canvasHeight,
          position: 0,
          isHorizontal: point.isHorizontal,
        });
        canvas.add(line);
      }
      snapped = true;
    }
  });

  // Snapping durumuna göre işlem yap
  if (!snapped) {
    clearGuidelines(canvas, guidelines, setGuidelines);
  } else {
    setGuidelines(newGuidelines);
  }

  // Canvas'ı güncelle
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
