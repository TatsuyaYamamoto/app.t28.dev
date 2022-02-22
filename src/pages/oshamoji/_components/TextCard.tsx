import { FC } from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

const Root = styled.div`
  height: 100%;

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
}

const TextCard: FC<TextCardProps> = (props) => {
  const { value, typeface, variant } = props;

  return (
    <Root>
      <Box textAlign={"right"}>
        <Box fontSize={"18px"}>{typeface}</Box>
        <Box fontSize={"14px"} color={"#1f1f1f"}>
          {variant}
        </Box>
      </Box>
      <ConvertedText>{value}</ConvertedText>
    </Root>
  );
};

export default TextCard;
