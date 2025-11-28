export const dimensionTypes = [
  "visualViewport",
  "layoutViewport",
  "browserWindow",
] as const;

export type DimensionType = (typeof dimensionTypes)[number];

export const dimensionNameMap = {
  visualViewport: "visual viewport",
  layoutViewport: "layout viewport",
  browserWindow: "browser window",
};
