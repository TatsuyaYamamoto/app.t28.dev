import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const IMAGE_GAP = 8;

interface GalleryProps {
  images: {
    base64: string;
    mediaType: string;
  }[];
  onRemoveImage: (index: number) => void;
}

export const Gallery: FC<GalleryProps> = ({ images, onRemoveImage }) => {
  const rootElRef = useRef<HTMLDivElement>(null);
  const [rootWidth, setRootWidth] = useState(0);
  const size =
    images.length === 1
      ? 250
      : (rootWidth - IMAGE_GAP * (images.length - 1)) / images.length;

  useEffect(() => {
    const rootEl = rootElRef.current;
    if (!rootEl) {
      return;
    }

    const handler = () => {
      const width = rootEl.getBoundingClientRect().width;
      setRootWidth(width);
    };

    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <Flex ref={rootElRef} width="100%" gap={`${IMAGE_GAP}px`}>
      {images.map(({ base64, mediaType }, i) => (
        <GalleryItem
          key={i}
          src={`data:${mediaType};base64,${base64}`}
          size={size}
          onRemoveImage={() => onRemoveImage(i)}
        />
      ))}
    </Flex>
  );
};

interface GalleryItemProps {
  src: string;
  size: number;
  onRemoveImage: () => void;
}

export const GalleryItem: FC<GalleryItemProps> = ({
  src,
  size,
  onRemoveImage,
}) => {
  return (
    <Box
      width={size}
      height={size}
      position="relative"
      borderRadius={8}
      overflow="hidden"
    >
      <IconButton
        position="absolute"
        top={1}
        right={1}
        rounded="full"
        size="2xs"
        onClick={onRemoveImage}
      >
        <IoCloseSharp />
      </IconButton>
      <Image src={src} width="100%" height="100%" objectFit="cover" />
    </Box>
  );
};
