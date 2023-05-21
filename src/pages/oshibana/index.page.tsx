import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import { DESCRIPTION, TITLE } from "./configs";

const ImageRenderer = dynamic(() => import("./_components/ImageRenderer"), {
  ssr: false,
});

const OshibanaIndex: NextPage = () => {
  const appAreaRef = useRef<HTMLDivElement>(null);
  const [rendererSize, setRendererSize] = useState({ width: 0, height: 0 });

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
      <Box ref={appAreaRef}>
        <ImageRenderer
          windowWidth={rendererSize.width}
          windowHeight={rendererSize.height}
          baseImageUrl={
            "https://pbs.twimg.com/media/FwqR7kzaEAU6NFL?format=png&name=900x900"
          }
        />
      </Box>
    </>
  );
};

export default OshibanaIndex;
