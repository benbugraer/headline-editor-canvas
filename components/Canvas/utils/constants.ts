export const CANVAS_DEFAULT_CONFIG = {
  width: 1200,
  height: 675,
  backgroundColor: "#fff",
} as const;

export const SNAPPING_CONFIG = {
  snappingDistance: 10,
} as const;

export const GUIDELINE_STYLES = {
  stroke: "red",
  strokeWidth: 1,
  selectable: false,
  evented: false,
  strokeDashArray: [5, 5],
  opacity: 0.8,
} as const;

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 675;
