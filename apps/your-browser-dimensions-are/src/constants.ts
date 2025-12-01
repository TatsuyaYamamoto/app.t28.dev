export const dimensionTypes = [
  "visualViewport",
  "layoutViewport",
  "clientWindow",
] as const;

export type DimensionType = (typeof dimensionTypes)[number];

export const dimensionNameMap = {
  visualViewport: "visual viewport",
  layoutViewport: "layout viewport",
  clientWindow: "client window",
} as const satisfies Record<DimensionType, string>;
