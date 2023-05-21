import { useEffect, useState } from "react";

export const useCanvasImageSource = (imageUrl: string) => {
  const [sourceInstance, setSource] = useState<CanvasImageSource | undefined>(
    undefined
  );
  const [sourceAspectRatio, setSourceAspectRatio] = useState(1);

  useEffect(() => {
    const image = new window.Image();
    image.addEventListener("load", () => {
      setSource(image);
      setSourceAspectRatio(image.naturalWidth / image.naturalHeight);
    });
    image.addEventListener("error", (e) => {
      console.error(e);
    });
    image.src = imageUrl;
  }, [imageUrl]);

  return { sourceInstance, sourceAspectRatio };
};
