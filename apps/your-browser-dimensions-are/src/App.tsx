import { type ChangeEvent, type FC, useState } from "react";

import Size from "./components/Size";
import {
  type DimensionType,
  dimensionNameMap,
  dimensionTypes,
} from "./constants.ts";
import { useDimensions } from "./hooks/useDimensions.ts";

const App: FC = () => {
  const { viewport, windowInner, windowOuter, devicePixelRatio } =
    useDimensions();
  const [dimensionType, setDimensionType] =
    useState<DimensionType>("visualViewport");

  const onSelectDimensionTypes = (e: ChangeEvent<HTMLSelectElement>) => {
    setDimensionType(e.target.value as DimensionType);
  };

  const width = {
    visualViewport: viewport?.width ?? 0,
    layoutViewport: windowInner?.width ?? 0,
    browserWindow: windowOuter?.width ?? 0,
  }[dimensionType];

  const height = {
    visualViewport: viewport?.height ?? 0,
    layoutViewport: windowInner?.height ?? 0,
    browserWindow: windowOuter?.height ?? 0,
  }[dimensionType];

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
        </div>
      </div>
    </div>
  );
};

export default App;
