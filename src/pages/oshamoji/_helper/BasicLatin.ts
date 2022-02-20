import { UnicodeSymbols } from "./UnicodeSymbols";

export const AsciiDigits: UnicodeSymbols = {
  typeface: "serif",
  variant: "normal",
  characterType: "digit",
  codePointRange: {
    from: "U+0030",
    to: "U+0039",
  },
};

export const UppercaseLatinAlphabet: UnicodeSymbols = {
  typeface: "serif",
  variant: "normal",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+0041",
    to: "U+005A",
  },
};

export const LowercaseLatinAlphabet: UnicodeSymbols = {
  typeface: "serif",
  variant: "normal",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+0061",
    to: "U+007A",
  },
};

export const BasicLatinSymbols = [
  AsciiDigits,
  UppercaseLatinAlphabet,
  LowercaseLatinAlphabet,
];
