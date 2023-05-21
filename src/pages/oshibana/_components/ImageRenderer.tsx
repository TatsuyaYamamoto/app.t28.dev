import type { FC } from "react";
import { Stage, Layer, Image } from "react-konva";

import { useCanvasImageSource } from "../../../helper/konva/useCanvasImageSource";
import { useMemo } from "react";

interface Props {
  windowWidth: number;
  windowHeight: number;
  baseImageUrl: string;
}

const ImageRenderer: FC<Props> = ({
  windowWidth,
  windowHeight,
  baseImageUrl,
}) => {
  const loadedBaseImage = useCanvasImageSource(baseImageUrl);
  const baseImage = useMemo(() => {
    const windowAspectRatio = windowWidth / windowHeight;

    if (loadedBaseImage.sourceAspectRatio > windowAspectRatio) {
      return {
        width: windowWidth,
        height: windowWidth / loadedBaseImage.sourceAspectRatio,
        instance: loadedBaseImage.sourceInstance,
      };
    }

    return {
      width: windowHeight * loadedBaseImage.sourceAspectRatio,
      height: windowHeight,
      instance: loadedBaseImage.sourceInstance,
    };
  }, [loadedBaseImage, windowWidth, windowHeight]);

  return (
    <Stage width={baseImage.width} height={baseImage.height}>
      <Layer>
        <Image
          image={baseImage.instance}
          width={baseImage.width}
          height={baseImage.height}
        />
      </Layer>
    </Stage>
  );
};

export default ImageRenderer;
