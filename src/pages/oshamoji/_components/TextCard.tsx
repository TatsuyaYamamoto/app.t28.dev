import { type FC, useRef, useState, type MouseEvent } from "react";
import { Tooltip } from "@chakra-ui/react";

import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";
import { copyToClipboard } from "../_helper/utils";
import { sendEvent } from "../_helper/ga";

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

  const onClick = (e: MouseEvent) => {
    console.log(e)
    e.preventDefault();

    sendEvent("click", { click_target: "text_card", label });

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

  const card = (
    <Root href="#" onClick={onClick}>
      <Box textAlign={"right"} fontSize={"18px"} color={"#1f1f1f"}>
        {label}
      </Box>
      <ConvertedText>{value}</ConvertedText>
    </Root>
  );

  /**
   * Next.js の SSR 時に ↓ の error が発生する
   * Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.
   * 対策として SSR(SSG)かどうかの分岐で Tooltip の描画を制御する
   */
  if (typeof window === "undefined") {
    return card;
  }

  return (
    <Tooltip isOpen={isOpenTooltip} hasArrow={true} label={"Copy!"}>
      {card}
    </Tooltip>
  );
};

export default TextCard;
