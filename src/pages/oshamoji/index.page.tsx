import Head from "next/head";
import { Box } from "@chakra-ui/react";

import TextCardList from "./_components/TextCardList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Oshamoji</title>
      </Head>

      <Box>
        <TextCardList />
      </Box>
    </>
  );
}
