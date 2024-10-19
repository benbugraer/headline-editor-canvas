import { Canvas, Object as FabricObject, Line } from "fabric";

interface Guidelines {
  id: string;
  line: Line;
}

interface SnapConfig {
  snappingDistance: number;
}

// Temel yapılandırma
const config: SnapConfig = {
  snappingDistance: 10,
};

export const handleObjectMoving = (
  canvas: Canvas,
  obj: FabricObject,
  guidelines: Guidelines[],
  setGuidelines: (guidelines: Guidelines[]) => void
): void => {
  const canvasWidth = canvas.width || 0;
  const canvasHeight = canvas.height || 0;

  const left = obj.left || 0;
  const top = obj.top || 0;
  const right = left + (obj.width || 0) * (obj.scaleX || 1);
  const bottom = top + (obj.height || 0) * (obj.scaleY || 1);

  const centerX = left + ((obj.width || 0) * (obj.scaleX || 1)) / 2;
  const centerY = top + ((obj.height || 0) * (obj.scaleY || 1)) / 2;

  const newGuidelines: Guidelines[] = [];
  let snapped = false;

  // Sol kenara hizalama
  if (Math.abs(left) < config.snappingDistance) {
    obj.set({ left: 0 });
    if (!guidelineExists(canvas, "vertical-left")) {
      const line = createVerticalGuideline(canvas, 0, "vertical-left");
      newGuidelines.push({ id: "vertical-left", line });
      canvas.add(line);
    }
    snapped = true;
  }

  // Üst kenara hizalama
  if (Math.abs(top) < config.snappingDistance) {
    obj.set({ top: 0 });
    if (!guidelineExists(canvas, "horizontal-top")) {
      const line = createHorizontalGuideline(canvas, 0, "horizontal-top");
      newGuidelines.push({ id: "horizontal-top", line });
      canvas.add(line);
    }
    snapped = true;
  }

  // Sağ kenara hizalama
  if (Math.abs(right - canvasWidth) < config.snappingDistance) {
    obj.set({ left: canvasWidth - (obj.width || 0) * (obj.scaleX || 1) });
    if (!guidelineExists(canvas, "vertical-right")) {
      const line = createVerticalGuideline(
        canvas,
        canvasWidth,
        "vertical-right"
      );
      newGuidelines.push({ id: "vertical-right", line });
      canvas.add(line);
    }
    snapped = true;
  }

  // Alt kenara hizalama
  if (Math.abs(bottom - canvasHeight) < config.snappingDistance) {
    obj.set({ top: canvasHeight - (obj.height || 0) * (obj.scaleY || 1) });
    if (!guidelineExists(canvas, "horizontal-bottom")) {
      const line = createHorizontalGuideline(
        canvas,
        canvasHeight,
        "horizontal-bottom"
      );
      newGuidelines.push({ id: "horizontal-bottom", line });
      canvas.add(line);
    }
    snapped = true;
  }

  // Yatay merkez hizalama
  if (Math.abs(centerX - canvasWidth / 2) < config.snappingDistance) {
    obj.set({
      left: canvasWidth / 2 - ((obj.width || 0) * (obj.scaleX || 1)) / 2,
    });
    if (!guidelineExists(canvas, "vertical-center")) {
      const line = createVerticalGuideline(
        canvas,
        canvasWidth / 2,
        "vertical-center"
      );
      newGuidelines.push({ id: "vertical-center", line });
      canvas.add(line);
    }
    snapped = true;
  }

  // Dikey merkez hizalama
  if (Math.abs(centerY - canvasHeight / 2) < config.snappingDistance) {
    obj.set({
      top: canvasHeight / 2 - ((obj.height || 0) * (obj.scaleY || 1)) / 2,
    });
    if (!guidelineExists(canvas, "horizontal-center")) {
      const line = createHorizontalGuideline(
        canvas,
        canvasHeight / 2,
        "horizontal-center"
      );
      newGuidelines.push({ id: "horizontal-center", line });
      canvas.add(line);
    }
    snapped = true;
  }

  // Eğer hizalama yoksa, kılavuz çizgilerini temizle
  if (!snapped) {
    clearGuidelines(canvas);
  } else {
    setGuidelines(newGuidelines);
  }

  canvas.renderAll();
};

export const createVerticalGuideline = (
  canvas: Canvas,
  x: number,
  id: string
): Line => {
  return new Line([x, 0, x, canvas.height || 0], {
    id,
    stroke: "red",
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.8,
  });
};

export const createHorizontalGuideline = (
  canvas: Canvas,
  y: number,
  id: string
): Line => {
  return new Line([0, y, canvas.width || 0, y], {
    id,
    stroke: "red",
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.8,
  });
};

export const clearGuidelines = (canvas: Canvas): void => {
  const objects = canvas
    .getObjects()
    .filter(
      (obj) =>
        obj.id &&
        (obj.id.toString().startsWith("vertical-") ||
          obj.id.toString().startsWith("horizontal-"))
    );

  objects.forEach((obj) => {
    canvas.remove(obj);
  });

  canvas.renderAll();
};

const guidelineExists = (canvas: Canvas, id: string): boolean => {
  const objects = canvas.getObjects("line");
  return objects.some((obj) => obj.id === id);
};
