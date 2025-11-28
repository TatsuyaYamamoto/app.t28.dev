import { useEffect, useState } from "react";

export const useDimensions = () => {
  const [viewport, setViewport] = useState<{
    width: number;
    height: number;
    offsetTop: number;
    offsetLeft: number;
  } | null>(null);

  const [windowInner, setWindowInner] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [windowOuter, setWindowOuter] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio,
  );

  useEffect(() => {
    const handler = () => {
      setViewport(
        window.visualViewport
          ? {
              width: window.visualViewport.width,
              height: window.visualViewport.height,
              offsetTop: window.visualViewport.offsetTop,
              offsetLeft: window.visualViewport.offsetLeft,
            }
          : null,
      );
      setWindowInner({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setWindowOuter({
        width: window.outerWidth,
        height: window.outerHeight,
      });
      setDevicePixelRatio(parseFloat(window.devicePixelRatio.toFixed(2)));
    };

    window.addEventListener("resize", handler);
    handler();

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return {
    viewport,
    windowInner,
    windowOuter,
    devicePixelRatio,
  };
};
