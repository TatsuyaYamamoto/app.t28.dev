import { FC, useRef, useState } from "react";

import styled from "@emotion/styled";
import { Box, Tooltip } from "@chakra-ui/react";
import { copyToClipboard } from "../_helper/utils";

const Root = styled.button`
  display: block;
  height: 100%;
  width: 100%;
  text-align: left;

  border-radius: 10px;
  font-size: 24px;
  font-weight: 400;

  box-shadow: 1px 1px 5px #000000;
  background: #ffffff;
  padding: 20px;

  box-sizing: border-box;
`;

const ConvertedText = styled.div`
  white-space: pre-wrap;
`;

export interface TextCardProps {
  value: string;
  typeface: string;
  variant: string;
  onClick: () => void;
}

const TextCard: FC<TextCardProps> = (props) => {
  const { value, typeface, variant } = props;
  const [isOpenTooltip, setOpenTooltip] = useState(false);
  const tooltipTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const onClick = () => {
    copyToClipboard(value)
      .then(() => {
        setOpenTooltip(true);
        props.onClick();

        if (tooltipTimeoutId.current) {
          clearTimeout(tooltipTimeoutId.current);
        }
        tooltipTimeoutId.current = setTimeout(
          () => setOpenTooltip(false),
          1500
        );
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <Tooltip isOpen={isOpenTooltip} hasArrow={true} label={"Copy!"}>
      <Root onClick={onClick}>
        <Box textAlign={"right"}>
          <Box fontSize={"18px"}>{typeface}</Box>
          <Box fontSize={"14px"} color={"#1f1f1f"}>
            {variant}
          </Box>
        </Box>
        <ConvertedText>{value}</ConvertedText>
      </Root>
    </Tooltip>
  );
};

export default TextCard;
