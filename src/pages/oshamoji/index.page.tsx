import { useCallback, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Head from "next/head";
import { Global, css } from "@emotion/react";
import { Box } from "@chakra-ui/react";
import hotkeys from "hotkeys-js";

import TextCardList from "./_components/TextCardList";
import AppBar from "./_components/AppBar";
import Footer from "./_components/Footer";
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

  const onClickTweetFab = useCallback(() => {
    if (!tweetText) {
      return;
    }
    window.location.href = `https://twitter.com/intent/tweet?text=${tweetText}`;
  }, [tweetText]);

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

  useEffect(() => {
    const editCommand = `ctrl+e, command+e`;
    const tweetCommand = `ctrl+k, command+k`;

    hotkeys(editCommand, onClickEditFab);
    hotkeys(tweetCommand, onClickTweetFab);
    return () => {
      hotkeys.unbind(editCommand);
      hotkeys.unbind(tweetCommand);
    };
  }, [onClickTweetFab]);

  return (
    <>
      <Head>
        <title>Oshamoji</title>
      </Head>

      <Global
        styles={css`
          html {
            height: 100%;
          }
          body,
          #__next {
            min-height: 100%;
          }
        `}
      />

      <Box
        minHeight={"100%"}
        paddingTop={72 /* appbar */ + 24 + "px"}
        paddingBottom={144 /* footer and fab */ + 24 + "px"}
      >
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
        <Footer />
      </Box>
    </>
  );
}
