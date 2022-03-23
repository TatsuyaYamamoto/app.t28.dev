import {
  AsciiDigits,
  LowercaseLatinAlphabet,
  UppercaseLatinAlphabet,
} from "./BasicLatin";

export type Typeface =
  | "serif"
  | "sansSerif"
  | "script"
  | "fraktur"
  | "monoSpace"
  | "doubleStruck";
export type Variant = "normal" | "bold" | "italic" | "boldItalic";
export type CharacterType = "digit" | "latinLetter";
export type LetterCase = "uppercase" | "lowercase";

export interface UnicodeSymbols {
  typeface: Typeface;
  variant: Variant;
  characterType: CharacterType;
  letterCase?: LetterCase;
  codePointRange: {
    from: string;
    to: string;
  };
  reservedSymbols?: {
    codePoint: string;
    assignedCodePoint: string;
  }[];
}

const toIntCodePoint = (codePoint: string): number => {
  const hexadecimal = codePoint.replace("U+", "");
  return parseInt(hexadecimal, 16);
};

const getBasicLatinTopCodepoint = (
  characterType: CharacterType,
  letterCase?: LetterCase
): number => {
  if (characterType === "digit") {
    return toIntCodePoint(AsciiDigits.codePointRange.from);
  }
  if (characterType === "latinLetter") {
    if (letterCase === "uppercase") {
      return toIntCodePoint(UppercaseLatinAlphabet.codePointRange.from);
    }
    if (letterCase === "lowercase") {
      return toIntCodePoint(LowercaseLatinAlphabet.codePointRange.from);
    }
  }

  return 0;
};

export const include = (
  codePoint: number,
  unicodeSymbols: UnicodeSymbols
): boolean => {
  const inRange =
    toIntCodePoint(unicodeSymbols.codePointRange.from) <= codePoint &&
    codePoint <= toIntCodePoint(unicodeSymbols.codePointRange.to);

  if (inRange) {
    return true;
  }

  const reservedSymbol = unicodeSymbols.reservedSymbols?.find((reserved) => {
    return toIntCodePoint(reserved.assignedCodePoint) === codePoint;
  });

  return !!reservedSymbol;
};

export const convert = (
  basicLatinCodePoint: number,
  targetUnicodeSymbols: UnicodeSymbols
): string => {
  const basicLatinTopCodepoint = getBasicLatinTopCodepoint(
    targetUnicodeSymbols.characterType,
    targetUnicodeSymbols.letterCase
  );
  const codePointDiff = basicLatinCodePoint - basicLatinTopCodepoint;
  const targetCharCodepoint =
    toIntCodePoint(targetUnicodeSymbols.codePointRange.from) + codePointDiff;

  const reservedSymbol = targetUnicodeSymbols.reservedSymbols?.find(
    (reserved) => {
      return toIntCodePoint(reserved.codePoint) === targetCharCodepoint;
    }
  );

  return reservedSymbol
    ? String.fromCodePoint(toIntCodePoint(reservedSymbol.assignedCodePoint))
    : String.fromCodePoint(targetCharCodepoint);
};

export const toBasicLatinChar = (
  sourceCharCodePoint: number,
  sourceUnicodeSymbols: UnicodeSymbols
): string => {
  const topCodepoint = toIntCodePoint(sourceUnicodeSymbols.codePointRange.from);
  const reservedSymbol = sourceUnicodeSymbols.reservedSymbols?.find(
    (reserved) => {
      return toIntCodePoint(reserved.assignedCodePoint) === sourceCharCodePoint;
    }
  );

  const codePointDiff = reservedSymbol
    ? toIntCodePoint(reservedSymbol.codePoint) - topCodepoint
    : sourceCharCodePoint - topCodepoint;

  const basicLatinTopCodepoint = getBasicLatinTopCodepoint(
    sourceUnicodeSymbols.characterType,
    sourceUnicodeSymbols.letterCase
  );

  const basicLatinCharCodepoint = basicLatinTopCodepoint + codePointDiff;

  return String.fromCodePoint(basicLatinCharCodepoint);
};
