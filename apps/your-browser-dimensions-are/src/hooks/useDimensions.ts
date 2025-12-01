import { useEffect, useState } from "react";

export const useDimensions = () => {
  const [visualViewport, setVisualViewport] = useState<{
    width: number;
    height: number;
    offsetTop: number;
    offsetLeft: number;
    scale: number;
  } | null>(null);

  const [layoutViewport, setLayoutViewport] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [browserWindow, setBrowserWindow] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio,
  );

  useEffect(() => {
    const onWindowResize = () => {
      setLayoutViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setBrowserWindow({
        width: window.outerWidth,
        height: window.outerHeight,
      });
      setDevicePixelRatio(parseFloat(window.devicePixelRatio.toFixed(2)));
    };

    const onVisualLayoutUpdate = () => {
      setVisualViewport(
        window.visualViewport
          ? {
              width: Math.round(window.visualViewport.width),
              height: Math.round(window.visualViewport.height),
              offsetTop: window.visualViewport.offsetTop,
              offsetLeft: window.visualViewport.offsetLeft,
              scale: parseFloat(window.visualViewport.scale.toFixed(2)),
            }
          : null,
      );
    };

    window.addEventListener("resize", onWindowResize);
    window.visualViewport?.addEventListener("resize", onVisualLayoutUpdate);
    window.visualViewport?.addEventListener("scroll", onVisualLayoutUpdate);
    onWindowResize();
    onVisualLayoutUpdate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.visualViewport?.removeEventListener(
        "resize",
        onVisualLayoutUpdate,
      );
      window.visualViewport?.removeEventListener(
        "scroll",
        onVisualLayoutUpdate,
      );
    };
  }, []);

  return {
    visualViewport,
    layoutViewport,
    browserWindow,
    devicePixelRatio,
  };
};
