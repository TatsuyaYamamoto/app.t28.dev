import { forwardRef } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { css } from "@emotion/react";

interface Props {}

export default forwardRef<HTMLDivElement, Props>(function Footer(_props, ref) {
  return (
    <Box
      ref={ref}
      as={"footer"}
      position={"absolute"}
      bottom={0}
      height={"52px"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"#ffa000"}
      fontSize={"16px"}
      padding={"0 16px"}
      overflow={"hidden"}
      sx={{
        "@media  (min-width: 600px)": {},
        "@media  (min-width: 900px)": {
          padding: "0 100px",
        },
      }}
    >
      <Box textAlign={"center"}>
        {`Made for myself in 🇯🇵 by`}
        <a
          css={css`
            margin: 0 5px;
          `}
          href="https://twitter.com/T28_tatsuya"
        >
          @T28_tatsuya
        </a>
        {`and share with you!`}
      </Box>
    </Box>
  );
});
