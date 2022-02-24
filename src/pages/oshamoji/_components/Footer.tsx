import { FC } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { css } from "@emotion/react";

const Footer: FC = () => {
  return (
    <Box
      as={"footer"}
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
      <Box textAlign={"center"} marginY={1}>
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
};

export default Footer;
