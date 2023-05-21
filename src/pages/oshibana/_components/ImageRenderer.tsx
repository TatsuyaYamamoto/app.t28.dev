import type { FC } from "react";
import { Stage, Layer, Image } from "react-konva";

import { useCanvasImageSource } from "../../../helper/konva/useCanvasImageSource";
import { useMemo } from "react";

interface Props {
  windowWidth: number;
  windowHeight: number;
  baseImageUrl?: string | undefined;
  itemImageUrl?: string | undefined;
}

const ImageRenderer: FC<Props> = ({
  windowWidth,
  windowHeight,
  baseImageUrl,
  itemImageUrl,
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

  const loadedItemImage = useCanvasImageSource(itemImageUrl);
  const itemImage = useMemo(() => {
    const baseImageAspectRatio = baseImage.width / baseImage.height;

    if (loadedItemImage.sourceAspectRatio > baseImageAspectRatio) {
      return {
        width: baseImage.height * loadedItemImage.sourceAspectRatio,
        height: baseImage.height,
        instance: loadedItemImage.sourceInstance,
      };
    }
    return {
      width: baseImage.width,
      height: baseImage.width / loadedItemImage.sourceAspectRatio,
      instance: loadedItemImage.sourceInstance,
    };
  }, [loadedItemImage, baseImage.width, baseImage.height]);

  return (
    <Stage width={baseImage.width} height={baseImage.height}>
      <Layer>
        <Image
          alt={""}
          image={itemImage.instance}
          width={itemImage.width}
          height={itemImage.height}
        />
        <Image
          alt={""}
          image={baseImage.instance}
          width={baseImage.width}
          height={baseImage.height}
        />
      </Layer>
    </Stage>
  );
};

export default ImageRenderer;
