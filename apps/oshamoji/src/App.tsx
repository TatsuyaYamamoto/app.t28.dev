import { useCallback, useEffect, useState } from "react";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import hotkeys from "hotkeys-js";
import { useInView } from "react-intersection-observer";

import { theme } from "shared/helpers/chakraTheme";

import AppBar from "./_components/AppBar";
import Fabs from "./_components/Fabs";
import Footer from "./_components/Footer";
import ModalEditor from "./_components/ModalEditor";
import TextCardList from "./_components/TextCardList";
import { sendEvent } from "./_helper/ga";

export default function Home() {
  const [isOpenModalEditor, setOpenModalEditor] = useState(false);
  const [vanillaText, setVanillaText] = useState<string>(() => {
    const params = new URL(location.href).searchParams;
    return params.get("text") ?? "";
  });
  const [tweetText, setTweetText] = useState("");
  const showTwitterFab = !!tweetText;
  const [footerAreaDummyElRef, isFooterViewed] = useInView();

  // スクロールで最下部に行くと FabとFooterが重なるため、状態によって Fab の positionを切り替える
  const fabPosition =
    // prettier-ignore
    // スクロールが必要な高さで
    (typeof document !== "undefined" && document.documentElement.clientHeight < document.documentElement.scrollHeight) &&
    // Footerが見えていたら
    isFooterViewed
      // TextCardList(の親要素)の範囲で bottom: 20 の位置 (footerに重ならない)
      ? "absolute"
      // Footer が見えない、またはスクロールが発生しない状態でFooterが表示されていたら
      // ViewPort の範囲で bottom: 20 の位置 (このときはFabとFooterが重なるけれど、許容)
      : "fixed";

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
    <ChakraProvider resetCSS={true} theme={theme}>
      <Global
        styles={css`
          html {
            height: 100%;
          }
        `}
      />
      <Box paddingTop={72 /* appbar */ + 24 + "px"}>
        <AppBar />
        <Box position={"relative"} paddingBottom={16}>
          <TextCardList vanillaText={vanillaText} onClickCard={onClickCard} />
          <Fabs
            showTweetFab={showTwitterFab}
            onClickEdit={onClickEditFab}
            onClickTweet={onClickTweetFab}
            css={css`
              position: ${fabPosition};
              right: 20px;
              bottom: 20px;
            `}
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
  );
}
