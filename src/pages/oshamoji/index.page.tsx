import { useState } from "react";

import dynamic from "next/dynamic";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import TextCardList from "./_components/TextCardList";
import Fab from "./_components/Fab";
const ModalEditor = dynamic(() => import("./_components/ModalEditor"), {
  ssr: false,
});

export default function Home() {
  const [isOpenModalEditor, setOpenModalEditor] = useState(false);
  const [text, setText] = useState("");

  const onClickFab = () => {
    setOpenModalEditor(true);
  };

  const onCloseModal = () => {
    setOpenModalEditor(false);
  };

  const onChangeText = (value: string) => {
    setText(value);
  };

  return (
    <>
      <Head>
        <title>Oshamoji</title>
      </Head>

      <Box>
        <TextCardList text={text} />
        <ModalEditor
          value={text}
          isOpen={isOpenModalEditor}
          onClose={onCloseModal}
          onChangeText={onChangeText}
        />
        <Fab onClick={onClickFab} />
      </Box>
    </>
  );
}
