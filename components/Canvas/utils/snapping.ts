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
  const guidelineObjects = canvas
    .getObjects()
    .filter((obj): obj is CustomFabricLine => {
      return (
        obj instanceof CustomFabricLine &&
        obj.data !== undefined &&
        Object.values(GuidelineId).includes(obj.data.id)
      );
    });

  guidelineObjects.forEach((obj) => canvas.remove(obj));
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
      orientation: isHorizontal ? "horizontal" : "vertical",
      isHorizontal,
    });
    canvas.add(line);
  }
};

export const handleObjectMoving = (
  canvas: Canvas,
  movingObject: FabricObject,
  guidelines: GuidelineType[],
  setGuidelines: (guidelines: GuidelineType[]) => void
): void => {
  if (!canvas || !movingObject) return;

  const canvasWidth = canvas.width ?? 0;
  const canvasHeight = canvas.height ?? 0;
  const movingBounds = calculateObjectBounds(movingObject);
  const newGuidelines: GuidelineType[] = [];
  let hasSnapped = false;

  // Canvas edge snapping
  const snapToCanvasEdges = () => {
    const { snappingDistance } = SNAPPING_CONFIG;
    const snapPoints = [
      {
        condition: checkAlignment(movingBounds.left, 0, snappingDistance),
        snap: { left: 0 },
        createGuideline: () =>
          createAlignmentGuideline(
            canvas,
            0,
            false,
            GuidelineId.VerticalLeft,
            newGuidelines
          ),
      },
      {
        condition: checkAlignment(
          movingBounds.right,
          canvasWidth,
          snappingDistance
        ),
        snap: { left: canvasWidth - movingBounds.width },
        createGuideline: () =>
          createAlignmentGuideline(
            canvas,
            canvasWidth,
            false,
            GuidelineId.VerticalRight,
            newGuidelines
          ),
      },
      {
        condition: checkAlignment(movingBounds.top, 0, snappingDistance),
        snap: { top: 0 },
        createGuideline: () =>
          createAlignmentGuideline(
            canvas,
            0,
            true,
            GuidelineId.HorizontalTop,
            newGuidelines
          ),
      },
      {
        condition: checkAlignment(
          movingBounds.bottom,
          canvasHeight,
          snappingDistance
        ),
        snap: { top: canvasHeight - movingBounds.height },
        createGuideline: () =>
          createAlignmentGuideline(
            canvas,
            canvasHeight,
            true,
            GuidelineId.HorizontalBottom,
            newGuidelines
          ),
      },
      {
        condition: checkAlignment(
          movingBounds.centerX,
          canvasWidth / 2,
          snappingDistance
        ),
        snap: { left: canvasWidth / 2 - movingBounds.width / 2 },
        createGuideline: () =>
          createAlignmentGuideline(
            canvas,
            canvasWidth / 2,
            false,
            GuidelineId.VerticalCenter,
            newGuidelines
          ),
      },
      {
        condition: checkAlignment(
          movingBounds.centerY,
          canvasHeight / 2,
          snappingDistance
        ),
        snap: { top: canvasHeight / 2 - movingBounds.height / 2 },
        createGuideline: () =>
          createAlignmentGuideline(
            canvas,
            canvasHeight / 2,
            true,
            GuidelineId.HorizontalCenter,
            newGuidelines
          ),
      },
    ];

    snapPoints.forEach((point) => {
      if (point.condition) {
        movingObject.set(point.snap);
        point.createGuideline();
        hasSnapped = true;
      }
    });
  };

  // Object-to-object snapping
  const snapToObjects = () => {
    if (hasSnapped) return;

    const otherObjects = canvas
      .getObjects()
      .filter(
        (obj): obj is FabricObject =>
          obj !== movingObject && !(obj instanceof CustomFabricLine)
      );

    for (const targetObject of otherObjects) {
      if (hasSnapped) break;

      const targetBounds = calculateObjectBounds(targetObject);
      const { snappingDistance } = SNAPPING_CONFIG;

      // Vertical alignment
      if (
        checkAlignment(
          movingBounds.centerX,
          targetBounds.centerX,
          snappingDistance
        )
      ) {
        movingObject.set({
          left: targetBounds.centerX - movingBounds.width / 2,
        });
        createAlignmentGuideline(
          canvas,
          targetBounds.centerX,
          false,
          GuidelineId.ObjectVerticalCenter,
          newGuidelines
        );
        hasSnapped = true;
      } else if (
        checkAlignment(movingBounds.left, targetBounds.left, snappingDistance)
      ) {
        movingObject.set({ left: targetBounds.left });
        createAlignmentGuideline(
          canvas,
          targetBounds.left,
          false,
          GuidelineId.ObjectLeft,
          newGuidelines
        );
        hasSnapped = true;
      } else if (
        checkAlignment(movingBounds.right, targetBounds.right, snappingDistance)
      ) {
        movingObject.set({ left: targetBounds.right - movingBounds.width });
        createAlignmentGuideline(
          canvas,
          targetBounds.right,
          false,
          GuidelineId.ObjectRight,
          newGuidelines
        );
        hasSnapped = true;
      }

      // Horizontal alignment
      if (
        checkAlignment(
          movingBounds.centerY,
          targetBounds.centerY,
          snappingDistance
        )
      ) {
        movingObject.set({
          top: targetBounds.centerY - movingBounds.height / 2,
        });
        createAlignmentGuideline(
          canvas,
          targetBounds.centerY,
          true,
          GuidelineId.ObjectHorizontalCenter,
          newGuidelines
        );
        hasSnapped = true;
      } else if (
        checkAlignment(movingBounds.top, targetBounds.top, snappingDistance)
      ) {
        movingObject.set({ top: targetBounds.top });
        createAlignmentGuideline(
          canvas,
          targetBounds.top,
          true,
          GuidelineId.ObjectTop,
          newGuidelines
        );
        hasSnapped = true;
      } else if (
        checkAlignment(
          movingBounds.bottom,
          targetBounds.bottom,
          snappingDistance
        )
      ) {
        movingObject.set({ top: targetBounds.bottom - movingBounds.height });
        createAlignmentGuideline(
          canvas,
          targetBounds.bottom,
          true,
          GuidelineId.ObjectBottom,
          newGuidelines
        );
        hasSnapped = true;
      }
    }
  };

  // Perform snapping
  snapToCanvasEdges();
  snapToObjects();

  // Update guidelines
  if (!hasSnapped) {
    clearGuidelines(canvas, guidelines, setGuidelines);
  } else {
    setGuidelines(newGuidelines);
  }

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
