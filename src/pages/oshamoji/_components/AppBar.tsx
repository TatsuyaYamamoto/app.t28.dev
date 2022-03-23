import { Box } from "@chakra-ui/react";
import { useEffect, UIEvent, useState } from "react";

const AppBar = () => {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const scroll = () => {
      setShowShadow(30 < window.scrollY);
    };

    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  });

  return (
    <Box
      as={"header"}
      position={"fixed"}
      width={"100%"}
      height={"72px"}
      display={"flex"}
      alignItems={"center"}
      top={0}
      zIndex={1}
      backdropFilter={"blur(13px)"}
      fontSize={"36px"}
      padding={"24px 16px 24px"}
      boxShadow={showShadow ? "md" : undefined}
      transition={"box-shadow 200ms"}
      sx={{
        "@media  (min-width: 600px)": {},
        "@media  (min-width: 900px)": {
          padding: "24px 100px 24px",
        },
      }}
    >{`Oshamoji`}</Box>
  );
};

export default AppBar;
