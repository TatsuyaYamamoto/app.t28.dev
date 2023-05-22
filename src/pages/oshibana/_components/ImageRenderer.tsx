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

    const width =
      loadedItemImage.sourceAspectRatio > baseImageAspectRatio
        ? baseImage.height * loadedItemImage.sourceAspectRatio
        : baseImage.width;
    const height =
      loadedItemImage.sourceAspectRatio > baseImageAspectRatio
        ? baseImage.height
        : baseImage.width / loadedItemImage.sourceAspectRatio;

    const x = baseImage.width / 2 - width / 2;
    const y = baseImage.height / 2 - height / 2;

    return { x, y, width, height, instance: loadedItemImage.sourceInstance };
  }, [loadedItemImage, baseImage.width, baseImage.height]);

  return (
    <Stage width={baseImage.width} height={baseImage.height}>
      <Layer>
        <Image
          alt={""}
          image={itemImage.instance}
          x={itemImage.x}
          y={itemImage.y}
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
