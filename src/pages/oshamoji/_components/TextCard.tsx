import { FC, useRef, useState } from "react";

import styled from "@emotion/styled";
import { Box, Tooltip } from "@chakra-ui/react";
import { copyToClipboard } from "../_helper/utils";

const Root = styled.a`
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

  word-break: break-word;
`;

const ConvertedText = styled.div`
  white-space: pre-wrap;
`;

export interface TextCardProps {
  value: string;
  label: string;
  onClick: () => void;
}

const TextCard: FC<TextCardProps> = (props) => {
  const { value, label } = props;
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
      <Root href="#" onClick={onClick}>
        <Box textAlign={"right"} fontSize={"18px"} color={"#1f1f1f"}>
          {label}
        </Box>
        <ConvertedText>{value}</ConvertedText>
      </Root>
    </Tooltip>
  );
};

export default TextCard;
