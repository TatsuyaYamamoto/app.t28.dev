import { FC, useEffect, useState } from "react";

import { Grid, GridItem } from "@chakra-ui/react";
import TextCard from "./TextCard";

import OshalizableChar from "../_helper/OshalizableChar";
import { Typeface, Variant } from "../_helper/UnicodeSymbols";

interface Props {
  text: string;
}

const TextCardList: FC<Props> = (props) => {
  const text =
    props.text || `Why don't you tweet your EMOTION with osha na moji?`;

  const [convertedList, setConvertedList] = useState<
    { typeface: string; variant: string; value: string }[]
  >([]);

  useEffect(() => {
    const inputChars = OshalizableChar.from(text);
    const convertTargetTypes: {
      typeface: Typeface;
      variant: Variant;
    }[] = [
      {
        typeface: "serif",
        variant: "normal",
      },
      {
        typeface: "serif",
        variant: "bold",
      },
      {
        typeface: "serif",
        variant: "italic",
      },
      {
        typeface: "serif",
        variant: "boldItalic",
      },
      {
        typeface: "sansSerif",
        variant: "normal",
      },
      {
        typeface: "sansSerif",
        variant: "bold",
      },
      {
        typeface: "sansSerif",
        variant: "italic",
      },
      {
        typeface: "sansSerif",
        variant: "boldItalic",
      },
      {
        typeface: "script",
        variant: "normal",
      },
      {
        typeface: "script",
        variant: "bold",
      },
      {
        typeface: "fraktur",
        variant: "normal",
      },
      {
        typeface: "fraktur",
        variant: "bold",
      },
      {
        typeface: "monoSpace",
        variant: "normal",
      },
      {
        typeface: "doubleStruck",
        variant: "bold",
      },
    ];

    const convertResult = convertTargetTypes.map((type) => ({
      typeface: type.typeface,
      variant: type.variant,
      value: inputChars
        .map((char) =>
          char.convert({ block: "mathematicalAlphanumeric", ...type })
        )
        .join(""),
    }));
    setConvertedList(convertResult);
  }, [text]);

  return (
    <Grid
      templateColumns="repeat(1, 1fr)"
      templateRows={"auto"}
      gap={6}
      position={"relative"}
      padding={"24px 16px 24px"}
      sx={{
        "@media  (min-width: 600px)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media  (min-width: 900px)": {
          gridTemplateColumns: "repeat(3, 1fr)",
          padding: "24px 100px 24px",
        },
      }}
    >
      {convertedList.map((converted, i) => (
        <GridItem key={i}>
          <TextCard
            value={converted.value}
            typeface={converted.typeface}
            variant={converted.variant}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TextCardList;
