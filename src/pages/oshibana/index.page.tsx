import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { Box, Button, Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import type Konva from "konva";

import { DESCRIPTION, TITLE } from "./configs";
import {
  blobToDataUrl,
  downloadFile,
  useNextRouterQuery,
} from "../../helper/utils";
import { useBaseImageUrlQuery } from "./_hooks/useBaseImageUrlQuery";

const ImageRenderer = dynamic(() => import("./_components/ImageRenderer"), {
  ssr: false,
});

const OshibanaIndex: NextPage = () => {
  const konvaStageRef = useRef<Konva.Stage>(null);
  const [rendererSize, setRendererSize] = useState({ width: 0, height: 0 });
  const { baseImageUrl, setBaseImageUrl } = useBaseImageUrlQuery();
  const [itemImageUrl, setItemImageUrl] = useState<string | undefined>(
    undefined
  );

  const selectImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png";

    return new Promise<string>((resolve) => {
      input.addEventListener("change", (e) => {
        if (!(e.target instanceof HTMLInputElement)) {
          return;
        }

        const selectedImage = e.target.files?.item(0);
        if (!selectedImage) {
          return;
        }

        blobToDataUrl(selectedImage).then((dataUrl) => {
          resolve(dataUrl);
        });
      });

      input.click();
    });
  };

  const onClickBaseImageButton = () => {
    selectImage().then((baseUrl) => {
      setBaseImageUrl(baseUrl);
    });
  };
  const onClickItemImageButton = () => {
    selectImage().then((baseUrl) => {
      setItemImageUrl(baseUrl);
    });
  };

  const onDownload = () => {
    const dataUrl = konvaStageRef.current?.toDataURL({
      pixelRatio: 3,
    });
    if (!dataUrl) {
      return;
    }

    downloadFile(`Oshibana_${new Date().toISOString()}.png`, dataUrl);
  };

  useEffect(() => {
    const onResize = () => {
      setRendererSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <NextSeo title={TITLE} description={DESCRIPTION} />
      <Box>
        <ImageRenderer
          konvaStageRef={konvaStageRef}
          windowWidth={rendererSize.width}
          windowHeight={rendererSize.height}
          baseImageUrl={baseImageUrl}
          itemImageUrl={itemImageUrl}
        />
        <Flex
          position="fixed"
          width={"100%"}
          bottom={5}
          justifyContent="center"
          gap={2}
        >
          <Button onClick={onClickBaseImageButton}>{`フレーム`}</Button>
          <Button onClick={onClickItemImageButton}>{`スクショ`}</Button>
          <Button onClick={onDownload}>{`ダウンロード`}</Button>
        </Flex>
      </Box>
    </>
  );
};

export default OshibanaIndex;
