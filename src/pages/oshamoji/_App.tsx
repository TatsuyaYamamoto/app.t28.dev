import { useCallback, useEffect, useState, type FC } from "react";

import { css, Global } from "@emotion/react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import hotkeys from "hotkeys-js";
import { useInView } from "react-intersection-observer";

import TextCardList from "./_components/TextCardList";
import AppBar from "./_components/AppBar";
import Footer from "./_components/Footer";
import Fabs from "./_components/Fabs";
import ModalEditor from "./_components/ModalEditor";

import { sendEvent } from "./_helper/ga";
import { theme } from "../../helper/theme.ts";

const _App: FC = () => {
  const [isOpenModalEditor, setOpenModalEditor] = useState(false);
  const [vanillaText, setVanillaText] = useState("");
  const [tweetText, setTweetText] = useState("");
  const showTwitterFab = !!tweetText;
  const [footerAreaDummyElRef, isFooterViewed] = useInView();

  const onClickEditFab = () => {
    sendEvent("click", { click_target: "edit_fab" });
    setOpenModalEditor(true);
  };

  const onClickTweetFab = useCallback(() => {
    if (!tweetText) {
      return;
    }
    sendEvent("click", { click_target: "tweet_fab" });
    window.location.href = `https://twitter.com/intent/tweet?text=${tweetText}`;
  }, [tweetText]);

  const onCloseModal = () => {
    sendEvent("submit", { label: vanillaText });
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
      <Global
        styles={css`
          html {
            height: 100%;
          }
        `}
      />
      <ChakraProvider resetCSS={true} theme={theme}>
        <Box paddingTop={72 /* appbar */ + 24 + "px"}>
          <AppBar />
          <Box position={"relative"} paddingBottom={16}>
            <TextCardList vanillaText={vanillaText} onClickCard={onClickCard} />
            <Fabs
              showTweetFab={showTwitterFab}
              isFooterViewed={isFooterViewed}
              onClickEdit={onClickEditFab}
              onClickTweet={onClickTweetFab}
            />
          </Box>
          <Box height={"52px" /* footer */} ref={footerAreaDummyElRef} />
          <Footer />
        </Box>
        <ModalEditor
          value={vanillaText}
          isOpen={isOpenModalEditor}
          onClose={onCloseModal}
          onChangeText={onChangeText}
        />
      </ChakraProvider>
    </>
  );
};

export default _App;
