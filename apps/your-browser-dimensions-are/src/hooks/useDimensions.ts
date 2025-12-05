import { useEffect, useState } from "react";

const getVisualViewport = () => {
  return {
    width: Math.round(window.visualViewport?.width ?? 0),
    height: Math.round(window.visualViewport?.height ?? 0),
    offsetTop: window.visualViewport?.offsetTop ?? 0,
    offsetLeft: window.visualViewport?.offsetLeft ?? 0,
    scale: parseFloat(window.visualViewport?.scale.toFixed(2) ?? "0"),
  };
};

const getLayoutViewport = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const getClientWindow = () => {
  return {
    width: window.outerWidth,
    height: window.outerHeight,
  };
};

const getDevicePixelRatio = () => {
  return parseFloat(window.devicePixelRatio.toFixed(2));
};

export const useDimensions = () => {
  const [visualViewport, setVisualViewport] = useState(getVisualViewport());
  const [layoutViewport, setLayoutViewport] = useState(getLayoutViewport);
  const [clientWindow, setClientWindow] = useState(getClientWindow());
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    getDevicePixelRatio(),
  );

  useEffect(() => {
    const onWindowResize = () => {
      setLayoutViewport(getLayoutViewport());
      setClientWindow(getClientWindow());
      setDevicePixelRatio(getDevicePixelRatio());
    };

    const onVisualLayoutUpdate = () => {
      setVisualViewport(getVisualViewport());
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
    clientWindow,
    devicePixelRatio,
  };
};
