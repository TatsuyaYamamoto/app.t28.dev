import { FC, useEffect, useState } from "react";

import TextCard from "./TextCard";

import OshalizableChar from "../_helper/OshalizableChar";
import { Typeface, Variant } from "../_helper/UnicodeSymbols";

const TextCardList: FC = () => {
  const [input, setInput] = useState(
    `Why don't you tweet your EMOTION with osha na moji?`
  );
  const [convertedList, setConvertedList] = useState<string[]>([]);

  const onChange = (_: number) => (newValue: string) => {
    setInput(newValue);
  };

  useEffect(() => {
    const inputChars = OshalizableChar.from(input);
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

    const convertResult = convertTargetTypes.map((type) =>
      inputChars
        .map((char) =>
          char.convert({ block: "mathematicalAlphanumeric", ...type })
        )
        .join("")
    );
    setConvertedList(convertResult);
  }, [input]);

  return (
    <div>
      {convertedList.map((converted, i) => (
        <TextCard key={i} value={converted} onChange={onChange(i)} />
      ))}
    </div>
  );
};

export default TextCardList;
