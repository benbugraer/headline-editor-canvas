export const CANVAS_DEFAULT_CONFIG = {
  width: 700,
  height: 700,
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
