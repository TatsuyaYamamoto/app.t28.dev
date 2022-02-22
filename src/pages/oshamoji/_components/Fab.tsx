import { FC } from "react";

import { Button } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { AiOutlineEdit } from "react-icons/ai";

interface Props {
  onClick: () => void;
}

const Fab: FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <Button
      colorScheme="blue"
      aria-label="Edit text"
      position={"fixed"}
      borderRadius={"24px"}
      height={"48px"}
      right={"20px"}
      fontSize={"14px"}
      bottom={"20px"}
      css={css`
        -webkit-tap-highlight-color: transparent;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
          0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
      `}
      onClick={onClick}
    >
      <Icon
        as={AiOutlineEdit}
        height={"24px"}
        width={"24px"}
        marginRight={"8px"}
      />
      EDIT
    </Button>
  );
};

export default Fab;
