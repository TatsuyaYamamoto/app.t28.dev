import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import TextCardList from "./_components/TextCardList";
import AppBar from "./_components/AppBar";
const Fabs = dynamic(() => import("./_components/Fabs"), {
  ssr: false,
});
const ModalEditor = dynamic(() => import("./_components/ModalEditor"), {
  ssr: false,
});

export default function Home() {
  const [isOpenModalEditor, setOpenModalEditor] = useState(false);
  const [vanillaText, setVanillaText] = useState("");
  const [tweetText, setTweetText] = useState("");
  const showTwitterFab = !!tweetText;

  const onClickEditFab = () => {
    setOpenModalEditor(true);
  };

  const onClickTweetFab = () => {
    window.location.href = `https://twitter.com/intent/tweet?text=${tweetText}`;
  };

  const onCloseModal = () => {
    setOpenModalEditor(false);
  };

  const onChangeText = (value: string) => {
    setVanillaText(value);
  };

  const onClickCard = (value: string) => {
    setTweetText(value);
  };

  useEffect(() => {
    // テキストを更新したら、クリップボードの状態に関係なく、ツイート対象の文字はクリアする
    setTweetText("");
  }, [vanillaText]);

  return (
    <>
      <Head>
        <title>Oshamoji</title>
      </Head>

      <Box>
        <AppBar />
        <TextCardList vanillaText={vanillaText} onClickCard={onClickCard} />
        <ModalEditor
          value={vanillaText}
          isOpen={isOpenModalEditor}
          onClose={onCloseModal}
          onChangeText={onChangeText}
        />
        <Fabs
          showTweetFab={showTwitterFab}
          onClickEdit={onClickEditFab}
          onClickTweet={onClickTweetFab}
        />
      </Box>
    </>
  );
}
