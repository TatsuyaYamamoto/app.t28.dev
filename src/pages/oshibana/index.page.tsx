import type { NextPage } from "next";

import { Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import { DESCRIPTION, TITLE } from "./configs";

const OshibanaIndex: NextPage = () => {
  return (
    <>
      <NextSeo title={TITLE} description={DESCRIPTION} />
      <Box paddingTop={72 /* appbar */ + 24 + "px"}>{`Oshibana`}</Box>
    </>
  );
};

export default OshibanaIndex;
