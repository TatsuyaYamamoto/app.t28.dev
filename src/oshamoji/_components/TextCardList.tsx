import { FC, useMemo } from "react";

import { Grid, GridItem } from "@chakra-ui/react";
import TextCard from "./TextCard";

import OshalizableChar from "../_helper/oshamoji/OshalizableChar";
import { Typeface, Variant } from "../_helper/oshamoji/UnicodeSymbols";
import { PLACEHOLDER } from "../_helper/config";

const convertTargetTypes: {
  label: string;
  typeface: Typeface;
  variant: Variant;
}[] = [
  { label: "Serif", typeface: "serif", variant: "normal" },
  { label: "Bold", typeface: "serif", variant: "bold" },
  { label: "Italic", typeface: "serif", variant: "italic" },
  { label: "Bold italic", typeface: "serif", variant: "boldItalic" },
  { label: "Sans-serif", typeface: "sansSerif", variant: "normal" },
  { label: "Sans-serif bold", typeface: "sansSerif", variant: "bold" },
  { label: "Sans-serif italic", typeface: "sansSerif", variant: "italic" },
  // prettier-ignore
  { label: "Sans-serif bold italic", typeface: "sansSerif", variant: "boldItalic", },
  { label: "Script", typeface: "script", variant: "normal" },
  { label: "Bold script", typeface: "script", variant: "bold" },
  { label: "Fraktur", typeface: "fraktur", variant: "normal" },
  { label: "Bold Fraktur", typeface: "fraktur", variant: "bold" },
  { label: "Monospace", typeface: "monoSpace", variant: "normal" },
  { label: "Double-struck", typeface: "doubleStruck", variant: "normal" },
];

interface Props {
  vanillaText: string;
  onClickCard: (text: string) => void;
}

const TextCardList: FC<Props> = (props) => {
  const vanillaText = props.vanillaText || PLACEHOLDER;

  const onClickCard = (text: string) => () => {
    props.onClickCard(text);
  };

  const convertedList = useMemo(() => {
    const inputChars = OshalizableChar.from(vanillaText);

    return convertTargetTypes.map((type) => ({
      label: type.label,
      value: inputChars
        .map((char) =>
          char.convert({ block: "mathematicalAlphanumeric", ...type }),
        )
        .join(""),
    }));
  }, [vanillaText]);

  return (
    <Grid
      templateColumns="repeat(1, 1fr)"
      templateRows={"auto"}
      gap={6}
      position={"relative"}
      padding={"0 16px"}
      sx={{
        "@media  (min-width: 600px)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media  (min-width: 900px)": {
          gridTemplateColumns: "repeat(3, 1fr)",
          padding: "0 100px",
        },
      }}
    >
      {convertedList.map((converted, i) => (
        <GridItem key={i}>
          <TextCard
            value={converted.value}
            label={converted.label}
            onClick={onClickCard(converted.value)}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TextCardList;
