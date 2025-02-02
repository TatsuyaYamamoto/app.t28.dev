import type Konva from "konva";
import type { FC, Ref } from "react";
import { useMemo } from "react";
import { Image, Layer, Stage } from "react-konva";

import { useCanvasImageSource } from "shared/hooks/useCanvasImageSource";

interface Props {
  konvaStageRef?: Ref<Konva.Stage>;
  windowWidth: number;
  windowHeight: number;
  baseImageUrl?: string | undefined;
  itemImageUrl?: string | undefined;
}

const ImageRenderer: FC<Props> = ({
  konvaStageRef,
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
    <Stage
      ref={konvaStageRef}
      width={baseImage.width}
      height={baseImage.height}
    >
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
