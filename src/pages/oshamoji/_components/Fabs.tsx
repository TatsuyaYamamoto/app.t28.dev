import { VFC } from "react";

import { Box, Button, Tooltip, Icon, ScaleFade } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { AiFillEdit } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

const editIcon = <Icon as={AiFillEdit} height={"24px"} width={"24px"} />;
const twitterIcon = <Icon as={FaTwitter} height={"24px"} width={"24px"} />;

/**
 * https://material.io/components/buttons-floating-action-button#specs
 */
const fabCss = css`
  width: 56px;
  height: 56px;
  border-radius: 10000000px;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
`;

interface Props {
  showTweetFab: boolean;
  onClickEdit: () => void;
  onClickTweet: () => void;
  className?: string;
}

const Fabs: VFC<Props> = (props) => {
  const { showTweetFab, onClickEdit, onClickTweet, ...otherProps } = props;

  return (
    <Box zIndex={1} display={"flex"} flexDirection={"column"} {...otherProps}>
      <ScaleFade initialScale={0.2} in={showTweetFab}>
        <Tooltip label={`Twitter`} placement="left">
          <Button
            colorScheme="twitter"
            aria-label="Tweet"
            marginBottom={"16px"}
            css={fabCss}
            onClick={onClickTweet}
          >
            {twitterIcon}
          </Button>
        </Tooltip>
      </ScaleFade>
      <Tooltip label={`Edit`} placement="left">
        <Button aria-label="Edit text" css={fabCss} onClick={onClickEdit}>
          {editIcon}
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Fabs;
