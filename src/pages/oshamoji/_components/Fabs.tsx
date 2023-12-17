import type { FC } from "react";

import { Box, Button, Tooltip, Icon, ScaleFade } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { AiFillEdit } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

const editIcon = <Icon as={AiFillEdit} height={"24px"} width={"24px"} />;
const twitterIcon = <Icon as={FaTwitter} height={"24px"} width={"24px"} />;

/**
 * https://material.io/components/buttons-floating-action-button#specs
 */
const Fab = styled(Button)`
  width: 56px;
  height: 56px;
  border-radius: 10000000px;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
`;

interface Props {
  showTweetFab: boolean;
  isFooterViewed: boolean;
  onClickEdit: () => void;
  onClickTweet: () => void;
}

const Fabs: FC<Props> = (props) => {
  const { showTweetFab, isFooterViewed, onClickEdit, onClickTweet } = props;

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

  return (
    <Box
      zIndex={1}
      display={"flex"}
      flexDirection={"column"}
      position={fabPosition}
      right={"20px"}
      bottom={"20px"}
    >
      <ScaleFade initialScale={0.2} in={showTweetFab}>
        <Tooltip label={`Twitter`} placement="left">
          <Fab
            colorScheme="twitter"
            aria-label="Tweet"
            marginBottom={"16px"}
            onClick={onClickTweet}
          >
            {twitterIcon}
          </Fab>
        </Tooltip>
      </ScaleFade>
      <Tooltip label={`Edit`} placement="left">
        <Fab aria-label="Edit text" onClick={onClickEdit}>
          {editIcon}
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default Fabs;
