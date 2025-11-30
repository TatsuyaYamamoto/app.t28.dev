import { type ChangeEvent, type CSSProperties, type FC, useState } from "react";

import DimensionWidthHeight from "./components/DimensionWidthHeight.tsx";
import {
  type DimensionType,
  dimensionNameMap,
  dimensionTypes,
} from "./constants.ts";
import { useDimensions } from "./hooks/useDimensions.ts";

const App: FC = () => {
  const { visualViewport, layoutViewport, browserWindow, devicePixelRatio } =
    useDimensions();
  const [dimensionType, setDimensionType] =
    useState<DimensionType>("visualViewport");

  const onSelectDimensionTypes = (e: ChangeEvent<HTMLSelectElement>) => {
    setDimensionType(e.target.value as DimensionType);
  };

  const map = {
    visualViewport: {
      color: "--color-amber-500",
      width: {
        name: (
          <a href="https://developer.mozilla.org/docs/Web/API/VisualViewport">
            <code>visualViewport.width</code>
          </a>
        ),
        value: visualViewport?.width ?? 0,
      },
      height: {
        name: (
          <a href="https://developer.mozilla.org/docs/Web/API/VisualViewport">
            <code>visualViewport.height</code>
          </a>
        ),
        value: visualViewport?.height ?? 0,
      },
    },
    layoutViewport: {
      color: "--color-cyan-500",
      width: {
        name: "innerWidth",
        value: layoutViewport?.width ?? 0,
      },
      height: {
        name: "innerHeight",
        value: layoutViewport?.height ?? 0,
      },
    },
    browserWindow: {
      color: "--color-red-500",
      width: {
        name: "outerWidth",
        value: browserWindow?.width ?? 0,
      },
      height: {
        name: "outerHeight",
        value: browserWindow?.height ?? 0,
      },
    },
  };
  const { width, height, color } = map[dimensionType];

  return (
    <div style={{ "--color": `var(${color})` } as CSSProperties}>
      <div className="fixed flex h-full w-full items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-black sm:text-6xl">
            <span>{"Your "}</span>
            <select
              className="text-center text-(--color)"
              name="dimensionType"
              value={dimensionType}
              onChange={onSelectDimensionTypes}
            >
              {dimensionTypes.map((type) => (
                <option key={type} value={type}>
                  {dimensionNameMap[type]}
                </option>
              ))}
            </select>
            <span className="inline-block">{" size is:"}</span>
          </h1>
          <div className="my-5">
            <DimensionWidthHeight width={width} height={height} />
          </div>

          <div className="mt-2">
            <div className="text-lg">
              <a
                target="_blank"
                href="https://developer.mozilla.org/docs/Web/API/Window/devicePixelRatio"
              >
                Device pixel ratio
              </a>
              {`: ${devicePixelRatio}`}
            </div>
            <div className="text-lg">
              <a
                target="_blank"
                href="https://developer.mozilla.org/ja/docs/Web/API/VisualViewport/scale"
              >
                Visual viewport scale
              </a>
              {`: ${visualViewport?.scale}`}
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute top-0 border-12 border-(--color)"
        style={{
          width: width.value,
          height: height.value,
          ...(dimensionType === "visualViewport" && {
            top: visualViewport?.offsetTop ?? 0,
            left: visualViewport?.offsetLeft ?? 0,
          }),
        }}
      ></div>
    </div>
  );
};

export default App;
