import { type ChangeEvent, type FC, useState } from "react";

import Size from "./components/Size";
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
    visualViewport,
    layoutViewport,
    browserWindow,
  };
  const { width, height } = map[dimensionType] ?? { width: 0, height: 0 };

  return (
    <div>
      <div className="fixed flex h-full w-full items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-6xl font-black">
            {"My "}
            <select
              className="text-center underline decoration-dotted"
              value={dimensionType}
              onChange={onSelectDimensionTypes}
            >
              {dimensionTypes.map((type) => (
                <option key={type} value={type}>
                  {dimensionNameMap[type]}
                </option>
              ))}
            </select>
            {" size is:"}
          </h1>
          <div className="text-4xl font-extralight">
            <Size>{width}</Size>
            <span>{` × `}</span>
            <Size>{height}</Size>
          </div>
          <div className="text-lg">
            {`Device pixel ratio: ${devicePixelRatio}`}
          </div>
          <div className="text-lg">
            {`Visual viewport scale: ${visualViewport?.scale}`}
          </div>
        </div>
      </div>
      {dimensionType === "visualViewport" && (
        <div
          className="pointer-events-none absolute top-0 border-12 border-dashed border-amber-400"
          style={{
            width: visualViewport?.width ?? 0,
            height: visualViewport?.height ?? 0,
            top: visualViewport?.offsetTop ?? 0,
            left: visualViewport?.offsetLeft ?? 0,
          }}
        ></div>
      )}
      {dimensionType === "layoutViewport" && (
        <div
          className="pointer-events-none absolute top-0 border-12 border-dotted border-cyan-500"
          style={{
            width: layoutViewport?.width ?? 0,
            height: layoutViewport?.height ?? 0,
          }}
        ></div>
      )}
      {dimensionType === "browserWindow" && (
        <div
          className="pointer-events-none absolute top-0 border-12 border-dotted border-red-500"
          style={{
            width: browserWindow?.width ?? 0,
            height: browserWindow?.height ?? 0,
          }}
        ></div>
      )}
    </div>
  );
};

export default App;
